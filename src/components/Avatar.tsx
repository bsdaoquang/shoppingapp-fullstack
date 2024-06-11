import {View, Text, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';

type Props = {
  uid?: string;
};

const Avatar = (props: Props) => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://gamek.mediacdn.vn/133514250583805952/2022/5/18/photo-1-16528608926331302726659.jpg',
        }}
        style={[globalStyles.avatar]}
      />
    </View>
  );
};

export default Avatar;
