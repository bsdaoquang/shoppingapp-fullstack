import {Row, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Rating} from 'react-native-ratings';
import {TextComponent} from '../../../components';
import {useNavigation} from '@react-navigation/native';

type Props = {
  id: string;
};

const RatingComponent = (props: Props) => {
  const navigation: any = useNavigation();

  return (
    <Row
      justifyContent="flex-start"
      onPress={() => navigation.navigate('RatingScreen')}>
      <Rating
        startingValue={5}
        readonly
        ratingCount={5}
        ratingBackgroundColor="coral"
        imageSize={18}
      />
      <Space width={12} />
      <TextComponent text={`(320 Reviews)`} size={14} />
    </Row>
  );
};

export default RatingComponent;
