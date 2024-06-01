import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home2, Notification, ShoppingCart, User} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import CartNavigator from './CartNavigator';
import HomeNavigator from './HomeNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';
import {Row} from '@bsdaoquang/rncomponent';
import {TextComponent} from '../components';
import {fontFamilies} from '../constants/fontFamilies';
import SvgComponent from '../components/SvgComponent';
import {svgFile} from '../constants/svgFiles';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, size, color}) => {
          color = focused ? colors.white : colors.dark;
          size = focused ? 16 : 22;
          let icon = (
            <Home2
              variant={focused ? 'Bold' : 'Bulk'}
              size={size}
              color={color}
            />
          );
          let name = 'Home';
          switch (route.name) {
            case 'CartTab':
              icon = (
                <ShoppingCart
                  variant={focused ? 'Bold' : 'Bulk'}
                  color={color}
                  size={size}
                />
              );
              name = 'Cart';
              break;

            case 'NotificationTab':
              icon = (
                <Notification
                  variant={focused ? 'Bold' : 'Bulk'}
                  color={color}
                  size={size}
                />
              );
              name = 'Notifications';
              break;
            case 'ProfileTab':
              icon = (
                <User
                  variant={focused ? 'Bold' : 'Bulk'}
                  color={color}
                  size={size}
                />
              );
              name = 'Profile';
              break;
            default:
              icon = (
                <Home2
                  variant={focused ? 'Bold' : 'Bulk'}
                  size={size}
                  color={color}
                />
              );
              name = 'Home';
              break;
          }
          return (
            <Row
              styles={
                focused
                  ? {
                      backgroundColor: colors.gray,
                      height: 30,
                      borderRadius: 100,
                    }
                  : undefined
              }>
              <View style={focused ? styles.iconContainer : undefined}>
                {icon}
              </View>
              {focused && (
                <TextComponent
                  styles={{
                    paddingHorizontal: 6,
                    fontSize: 11,
                    fontFamily: fontFamilies.poppinsMedium,
                  }}
                  text={name}
                />
              )}
            </Row>
          );
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="CartTab" component={CartNavigator} />
      <Tab.Screen name="NotificationTab" component={NotificationNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
