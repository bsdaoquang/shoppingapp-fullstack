import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ProductModel} from '../models/ProductModel';
import {globalStyles} from '../styles/globalStyles';
import TextComponent from './TextComponent';
import {sizes} from '../constants/sizes';
import {fontFamilies} from '../constants/fontFamilies';
import {Space} from '@bsdaoquang/rncomponent';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

type Props = {
  product: ProductModel;
  styles?: StyleProp<ViewStyle>;
  index?: number;
};

const ProductItem = (props: Props) => {
  const {product, styles, index} = props;

  const WIDTH = (sizes.width - 48) / 2;
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {id: product.id})}
      style={[
        {
          width: (sizes.width - 48) / 2,
          marginLeft: index ? (index % 2 !== 0 ? 16 : 0) : 0,
          marginBottom: 16,
        },
        styles,
      ]}>
      <Image
        source={{uri: product.imageUrl}}
        style={{
          flex: 1,
          width: WIDTH,
          height: WIDTH - 20,
          maxWidth: 220,
          maxHeight: 200,
          borderRadius: 12,
          resizeMode: 'cover',
        }}
      />
      <View style={[globalStyles.center]}>
        <Space height={8} />
        <TextComponent
          text={product.title}
          size={18}
          numberOfLine={1}
          font={fontFamilies.poppinsBold}
        />
        <TextComponent
          text={product.type}
          color={colors.gray2}
          numberOfLine={1}
        />
        <TextComponent
          text={`$${product.price}`}
          size={20}
          font={fontFamilies.poppinsSemiBold}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
