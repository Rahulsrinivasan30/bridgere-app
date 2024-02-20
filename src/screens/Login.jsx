import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {bridgera_logo, hide, padlock, user_icon, view} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveLogin} from '../store/loginData';

const Login = () => {
  const navi = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(true);

  const onLogin = () => {
    if (name.length < 3 || pwd.length < 3) {
      setNameErr(true);
      setPwdErr(true);
      setLoad(false);
    } else {
      Keyboard.dismiss();
      setLoad(true);
      dispatch(
        saveLogin({
          name: name,
          password: pwd,
        }),
      );
      setTimeout(() => {
        navi.replace('home');
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={bridgera_logo} style={styles.img} />
      <Text style={styles.txt1}>Welcome!</Text>
      <View style={styles.inputView}>
        <Image source={user_icon} style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.txtInput}
          onChangeText={e => setName(e)}
        />
        {nameErr && name.length < 3 && (
          <Text style={styles.errTxt}>Enter name *</Text>
        )}
      </View>
      <View style={styles.inputView}>
        <Image source={padlock} style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={show}
          style={styles.txtInput}
          onChangeText={e => setPwd(e)}
        />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Image source={show ? hide : view} style={styles.icon} />
        </TouchableOpacity>

        {pwdErr && pwd.length < 3 && (
          <Text style={styles.errTxt}>Enter password *</Text>
        )}
      </View>
      <TouchableOpacity onPress={onLogin} style={styles.btn}>
        {load ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text style={styles.btnTxt}>Login</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 22,
    color: '#000000a7',
    marginBottom: 20,
  },
  txt5: {
    fontSize: 14,
    color: '#000000a7',
  },
  inputView: {
    position: 'relative',
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderColor: '#b32b2b',
    paddingHorizontal: 5,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  txtInput: {
    // borderWidth: 1,
    borderColor: '#b32b2b',
    width: '80%',
    fontSize: 16,
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
});
