import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AddPayment,
  CartScreen,
  FilterScreen,
  MapScreen,
  Payment,
  ProductDetail,
  RatingScreen,
  ResultScreen,
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
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
