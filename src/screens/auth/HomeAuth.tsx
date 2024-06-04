import {Button, Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {ImageBackground, StatusBar, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';

const HomeAuth = ({navigation}: any) => {
  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../assets/images/bg-login.png')}
        imageStyle={{
          flex: 1,
          resizeMode: 'cover',
        }}
        style={[globalStyles.container]}>
        <View style={{flex: 1}} />
        <Section styles={{paddingVertical: 16}}>
          <Button
            title="Login"
            textStyleProps={{
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: fontFamilies.poppinsBold,
            }}
            onPress={() =>
              navigation.navigate('SwiperScreen', {authState: 'Login'})
            }
          />
          <Button
            color="transparent"
            title="Sign Up"
            styles={{borderColor: 'white'}}
            textStyleProps={{
              fontWeight: '600',
              fontFamily: fontFamilies.poppinsBold,
            }}
            onPress={() =>
              navigation.navigate('SwiperScreen', {authState: 'SignUp'})
            }
          />
        </Section>
      </ImageBackground>
    </>
  );
};

export default HomeAuth;
