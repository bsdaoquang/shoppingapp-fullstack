import {View, Text} from 'react-native';
import React from 'react';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  console.log(id);
  return (
    <View>
      <Text>ProductDetail</Text>
    </View>
  );
};

export default ProductDetail;
