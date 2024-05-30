import React from 'react';
import HomeScreen from './src/screens/home/HomeScreen';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <HomeScreen />
    </>
  );
};

export default App;
