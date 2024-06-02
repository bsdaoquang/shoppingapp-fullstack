import React from 'react';
import {ActivityIndicator, ImageBackground, Text} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

const Splash = () => {
  return (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      imageStyle={{
        flex: 1,
        resizeMode: 'cover',
      }}
      style={[globalStyles.container, globalStyles.center]}>
      <ActivityIndicator color={'white'} size={20} />
    </ImageBackground>
  );
};

export default Splash;
