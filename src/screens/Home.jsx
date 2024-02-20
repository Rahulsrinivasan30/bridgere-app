import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import {bell, profile_img, search} from '../assets';
import {useSelector} from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const Home = () => {
  const loginData = useSelector(state => state.login);
  const [productList, setProductList] = useState([]);
  const [filterProdList, setFilterProdList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [endReached, setEndReached] = useState(false);
  const [categories, setCategories] = useState([]);

  //   console.log(loginData);

  const getProdList = async () => {
    const {data} = await axios('https://fakestoreapi.com/products');
    setProductList(data.slice(0, 10));
    console.log(data.length);
  };

  useEffect(() => {
    const tmp = [];
    productList.forEach(el => {
      if (tmp?.includes(el?.category)) {
      } else {
        tmp.push(el?.category);
      }
    });
    setCategories(tmp);
  }, [productList]);

  useEffect(() => {
    getProdList();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getProdList();
    setRefreshing(false);
    setSearchTxt('');
  };

  const onEndReached = async () => {
    if (productList?.length == 20) {
    } else {
      setEndReached(true);
      const {data} = await axios('https://fakestoreapi.com/products');
      setEndReached(false);
      setProductList([...productList, ...data.slice(10)]);
    }
  };

  useEffect(() => {
    if (searchTxt?.length > 0) {
      const tmp = productList.filter(
        e => e?.title?.includes(searchTxt) || e?.category?.includes(searchTxt),
      );
      setFilterProdList(tmp);
    } else {
      setFilterProdList(productList);
    }
  }, [searchTxt, productList]);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <TouchableOpacity style={styles.prodItem}>
        <Image src={item?.image} style={styles.prodImg} />
        <View style={styles.prodDetails}>
          <Text numberOfLines={1} style={styles.txtTitle}>
            {item?.title}
          </Text>
          <Text style={styles.categ}>{item?.category}</Text>
          <Text style={styles.txtPrice}>₹ {item?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onClickCat = item => {
    if (item == searchTxt) {
      setSearchTxt('');
    } else {
      setSearchTxt(item);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={profile_img} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={bell} style={styles.icon1} />
        </TouchableOpacity>
      </View>
      <View style={styles.cont2}>
        <Text style={styles.txt1}>
          Hello <Text style={styles.boldTxt}>{loginData?.name}</Text>,
        </Text>
        <Text style={styles.txt5}>Deals for you ;)</Text>
      </View>
      <View style={styles.cont3}>
        <View style={styles.search}>
          <Image source={search} style={styles.icon2} />
          <TextInput
            placeholder="Search title & category..."
            style={styles.txtInput1}
            value={searchTxt}
            onChangeText={e => setSearchTxt(e)}
          />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categCont}>
          {categories?.map((item, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => onClickCat(item)}
              style={
                item == searchTxt ? styles.selcategoryBtn : styles.categoryBtn
              }>
              <Text style={styles.categoryBtnTxt}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {endReached && productList?.length > 0 && (
          <View style={styles.btmLoader}>
            <ActivityIndicator size={'small'} color={'#b32b2b'} />
          </View>
        )}

        {productList?.length === 0 && (
          <>
            <ShimmerPlaceHolder
              style={styles.prodPlaceHolder}
              LinearGradient={LinearGradient}
            />
            <ShimmerPlaceHolder
              style={styles.prodPlaceHolder}
              LinearGradient={LinearGradient}
            />
            <ShimmerPlaceHolder
              style={styles.prodPlaceHolder}
              LinearGradient={LinearGradient}
            />
          </>
        )}
        <FlatList
          data={filterProdList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{borderWidth: 0, paddingBottom: '55%'}}
          onEndReached={onEndReached}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b32b2b',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  img: {
    marginTop: '20%',
    width: '60%',
    height: '20%',
    resizeMode: 'contain',
    borderColor: '#000',
  },
  txt1: {
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 8,
  },
  txt5: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputView: {
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#b32b2b',
    paddingHorizontal: 5,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginHorizontal: 5,
    tintColor: '#fff',
  },
  icon1: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 5,
    tintColor: '#fff',
  },
  icon2: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#b32b2b',
  },
  txtInput: {
    borderColor: '#b32b2b',
    width: '80%',
    fontSize: 16,
  },
  txtInput1: {
    width: '80%',
    textTransform: 'capitalize',
  },
  btn: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingVertical: 10,
    backgroundColor: '#b32b2b',
    borderRadius: 4,
    elevation: 10,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errTxt: {
    position: 'absolute',
    bottom: -20,
    right: 5,
    color: '#ff0000',
  },
  header: {
    marginTop: 20,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cont2: {
    width: '85%',
    marginTop: 30,
    alignItems: 'flex-start',
  },
  cont3: {
    backgroundColor: '#ffffffe8',
    width: '100%',
    height: '100%',
    marginTop: 30,
    borderTopEndRadius: 26,
    borderTopStartRadius: 26,
    position: 'relative',
    // padding: 16,
  },
  search: {
    paddingHorizontal: 8,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '92%',
    elevation: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 18,
    // marginHorizontal: 16,
  },
  boldTxt: {
    fontWeight: '600',
    fontStyle: 'italic',
  },
  prodItem: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '92%',
    alignSelf: 'center',
    elevation: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
  },
  prodPlaceHolder: {
    alignSelf: 'center',
    width: '92%',
    borderRadius: 10,
    marginBottom: 20,
    height: 90,
    elevation: 10,
  },
  prodImg: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  prodDetails: {
    marginLeft: 15,
    width: '100%',
  },
  txtTitle: {
    fontSize: 15,
    width: '67%',
    color: '#000',
    fontWeight: '500',
  },
  txtPrice: {
    // fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  categ: {
    textTransform: 'capitalize',
    marginBottom: 8,
    fontSize: 12,
  },
  categCont: {
    width: '92%',
    alignSelf: 'center',
    marginBottom: 18,
    flexDirection: 'row',
    overflow: 'scroll',
    paddingBottom: 3,
  },
  categoryBtn: {
    borderColor: '#b32b2b',
    // backgroundColor: '#b32b2b21',
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 50,
    maxHeight: 30,
  },
  selcategoryBtn: {
    borderColor: '#b32b2b',
    borderWidth: 1,
    backgroundColor: '#b32b2b26',
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 33,
    maxHeight: 30,
  },
  categoryBtnTxt: {
    textTransform: 'capitalize',
    color: '#b32b2b',
    fontSize: 13,
    height: 20,
    fontWeight: '500',
  },
  btmLoader: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 200,
  },
});
