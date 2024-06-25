import React, {useEffect, useState} from 'react';
import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localDataNames} from '../constants/localDataNames';
import {addcart, syncLocalStorage} from '../redux/reducers/cartReducer';

const Router = () => {
  const [isWellcome, setIsWellcome] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  useEffect(() => {
    getInitDatas();
  }, []);

  const getInitDatas = async () => {
    await getAuthData();
    await getCartData();
    setIsWellcome(false);
  };

  const getAuthData = async () => {
    const res = await AsyncStorage.getItem(localDataNames.auth);
    if (res) {
      dispatch(addAuth(JSON.parse(res)));
    }
  };

  const getCartData = async () => {
    const res = await AsyncStorage.getItem(localDataNames.cart);
    if (res) {
      dispatch(syncLocalStorage(JSON.parse(res)));
    }
  };

  return isWellcome ? (
    <Splash />
  ) : user.uid ? (
    <MainNavigator />
  ) : (
    <AuthNavigator />
  );
};

export default Router;
