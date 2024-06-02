import {Button, Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {ImageBackground, StatusBar, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

const HomeAuth = () => {
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
            }}
            onPress={() => {}}
          />
          <Button
            color="transparent"
            title="Sign Up"
            styles={{borderColor: 'white'}}
            textStyleProps={{
              fontWeight: '600',
            }}
            onPress={() => {}}
          />
        </Section>
      </ImageBackground>
    </>
  );
};

export default HomeAuth;
