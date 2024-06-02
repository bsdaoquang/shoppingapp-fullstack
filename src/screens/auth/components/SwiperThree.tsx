import {Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Image, View} from 'react-native';
import {TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {sizes} from '../../../constants/sizes';

const SwiperThree = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1.2,
          maxHeight: sizes.height * 0.6,
          padding: 20,
        }}>
        <Image
          source={require('../../../assets/images/sliders/slide-3.png')}
          style={{
            flex: 1,
            resizeMode: 'stretch',
            height: 'auto',
            width: sizes.width - 40,
          }}
        />
      </View>

      <Section styles={[{paddingTop: 24}]}>
        <TextComponent
          text={`20% discount\nNew Arrival products`}
          size={30}
          type="title"
          font={fontFamilies.poppinsBold}
        />
        <TextComponent
          numberOfLine={2}
          color={colors.description}
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe quod dolor iste ipsam laborum in, adipisci, molestias eum tempora, facilis esse! Veniam suscipit earum omnis! Sint dicta vel molestias reiciendis?"
        />
      </Section>
    </View>
  );
};

export default SwiperThree;
