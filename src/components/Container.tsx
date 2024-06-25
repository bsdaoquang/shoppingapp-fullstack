import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Button, Row, colors} from '@bsdaoquang/rncomponent';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  children: ReactNode;
  title?: string;
  back?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  isScroll?: boolean;
};

const Container = (props: Props) => {
  const {children, title, back, left, right, isScroll} = props;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={[globalStyles.container]}>
      {back || left || title || right ? (
        <Row
          styles={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            paddingTop:
              Platform.OS === 'android'
                ? StatusBar.currentHeight
                  ? StatusBar.currentHeight + 16
                  : 42
                : 42,
          }}>
          {back && (
            <Button
              inline
              styles={{
                width: 42,
                height: 42,
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
              isShadow={false}
              icon={
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={22}
                  color={'white'}
                />
              }
              color={colors.black}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
            />
          )}
          {left && !back && <TextComponent text="Left" />}

          <View style={[{paddingHorizontal: 16, flex: 1}]}>
            {title && (
              <TextComponent
                type="bigTitle"
                font={fontFamilies.poppinsMedium}
                text={title}
              />
            )}
          </View>
          {right && right}
        </Row>
      ) : (
        <View
          style={{
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 42,
          }}
        />
      )}

      {!isScroll && isScroll !== false ? (
        <ScrollView style={[globalStyles.container]}>{children}</ScrollView>
      ) : (
        <View style={[globalStyles.container]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Container;
