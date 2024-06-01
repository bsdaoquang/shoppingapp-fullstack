import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NotificationsScreen} from '../screens';

const NotificationNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NoticationScreen" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default NotificationNavigator;
