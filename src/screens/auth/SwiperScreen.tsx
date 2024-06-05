import {Button, Row, Section} from '@bsdaoquang/rncomponent';
import {ArrowRight2} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import SwiperOne from './components/SwiperOne';
import SwiperThree from './components/SwiperThree';
import SwiperTwo from './components/SwiperTwo';
import {useIsFocused} from '@react-navigation/native';

const SwiperScreen = ({navigation, route}: any) => {
  const {authState} = route.params;

  const [index, setIndex] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    setIndex(0);
  }, [isFocused]);

  return (
    <View style={[globalStyles.container, {paddingTop: 20}]}>
      <StatusBar hidden />
      <Swiper
        index={index}
        onIndexChanged={int => setIndex(int)}
        showsPagination={false}
        loop={false}>
        <SwiperOne />
        <SwiperTwo />
        <SwiperThree />
      </Swiper>
      <Section>
        <Row justifyContent="space-between">
          <Row>
            {Array.from({length: 3}).map((_item, ind) => (
              <View
                key={`dot${ind}`}
                style={{
                  height: 6,
                  backgroundColor: ind === index ? colors.dark : colors.gray2,
                  borderRadius: 100,
                  marginRight: 4,
                  width: ind === index ? 16 : 6,
                }}
              />
            ))}
          </Row>
          <Button
            color={colors.dark}
            styles={{
              width: 50,
              height: 50,
            }}
            icon={<ArrowRight2 size={24} color="white" />}
            onPress={() =>
              index === 2 ? navigation.navigate(authState) : setIndex(index + 1)
            }
          />
        </Row>
      </Section>
    </View>
  );
};

export default SwiperScreen;
