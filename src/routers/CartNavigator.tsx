import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CartScreen, MyOrder} from '../screens';

const CartNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
