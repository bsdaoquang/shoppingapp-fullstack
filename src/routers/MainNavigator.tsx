import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AddPayment,
  CartScreen,
  Payment,
  ProductDetail,
  RatingScreen,
} from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AddPayment" component={AddPayment} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
