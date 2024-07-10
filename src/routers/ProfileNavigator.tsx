import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MapScreen, ProfileScreen} from '../screens';
import Address from '../screens/profiles/Address';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
