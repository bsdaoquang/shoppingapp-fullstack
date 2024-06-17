import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Router from './src/routers/Router';
import {StatusBar} from 'react-native';
import {HandleNotification} from './src/utils/handleNotification';

const App = () => {
  useEffect(() => {
    HandleNotification.CheckNotificationPerson();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
