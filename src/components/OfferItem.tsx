import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OfferModel} from '../models/OfferModel';
import firestore from '@react-native-firebase/firestore';
import {FileModel} from '../models/FileModel';
import {sizes} from '../constants/sizes';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';
import {Button, Row} from '@bsdaoquang/rncomponent';

type Props = {
  item: OfferModel;
};

const OfferItem = (props: Props) => {
  const {item} = props;
  const [fileInfo, setFileInfo] = useState<FileModel>();

  useEffect(() => {
    if (item.files && item.files.length > 0) {
      handleGetImageInfo(item.files[0]);
    }
  }, [item]);

  const handleGetImageInfo = async (id: string) => {
    try {
      const snap: any = await firestore().collection('files').doc(id).get();
      if (snap.exists) {
        setFileInfo({
          id,
          ...snap.data(),
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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

  return fileInfo ? (
    <ImageBackground
      source={{uri: fileInfo.downloadUrl}}
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
