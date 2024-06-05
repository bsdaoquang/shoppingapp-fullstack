import {View, Text} from 'react-native';
import React from 'react';
import {Button} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localDataNames} from '../../constants/localDataNames';
import {removeAuth} from '../../redux/reducers/authReducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await auth().signOut();
          await AsyncStorage.removeItem(localDataNames.auth);
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default ProfileScreen;
