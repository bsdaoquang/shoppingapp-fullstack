import React, {useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      {1 > 2 ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
