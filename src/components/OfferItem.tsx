import {Button, Row} from '@bsdaoquang/rncomponent';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {sizes} from '../constants/sizes';
import {OfferModel} from '../models/OfferModel';
import TextComponent from './TextComponent';

type Props = {
  item: OfferModel;
};

const OfferItem = (props: Props) => {
  const {item} = props;

  const renderOfferChildren = () => (
    <>
      <TextComponent
        type="title"
        size={28}
        font={fontFamilies.poppinsBold}
        text={`${item.percent}% Off`}
      />
      <TextComponent text={item.title} color={colors.gray2} size={16} />
      <TextComponent
        text={`With code: ${item.code}`}
        size={16}
        styles={{paddingVertical: 12}}
      />
      <Row justifyContent="flex-start">
        <Button
          size="small"
          title="Get Now"
          styles={{paddingHorizontal: 20}}
          color={colors.dark}
          onPress={() => {}}
        />
      </Row>
    </>
  );

  return item.imageUrl ? (
    <ImageBackground
      source={{uri: item.imageUrl}}
      style={localstyles.container}
      imageStyle={{flex: 1, resizeMode: 'cover', borderRadius: 20}}>
      {renderOfferChildren()}
    </ImageBackground>
  ) : (
    <View style={localstyles.container}>{renderOfferChildren()}</View>
  );
};

export default OfferItem;

const localstyles = StyleSheet.create({
  container: {
    width: sizes.width * 0.7,
    minHeight: 180,
    marginRight: 16,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
