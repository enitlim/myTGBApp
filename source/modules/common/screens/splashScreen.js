// SplashScreen.js

import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
  const img = require('../../../../assets/logo_final.png');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Simulating a delay for the splash screen
    setTimeout(() => {
      // Redirect to the main screen or any other screen
      navigation.replace('Login');
    }, 1000); // 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
