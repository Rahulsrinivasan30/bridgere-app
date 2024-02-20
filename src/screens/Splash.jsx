import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {bridgera_logo} from '../assets';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navi = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navi.replace('login');
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={bridgera_logo} style={styles.img} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  img: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
