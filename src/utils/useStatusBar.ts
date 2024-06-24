import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Platform, StatusBar, StatusBarStyle } from 'react-native';

export const useStatusBar = (style: StatusBarStyle) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
      StatusBar.setTranslucent(true);
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    }, []),
  );
};
