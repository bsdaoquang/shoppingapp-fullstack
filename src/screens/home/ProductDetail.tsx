import React, {useEffect, useState} from 'react';
import {productRef} from '../../firebase/firebaseConfig';
import {ProductModel, SubProduct} from '../../models/ProductModel';
import firestore from '@react-native-firebase/firestore';
import {Container, TextComponent} from '../../components';
import {Touchable, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {Space} from '@bsdaoquang/rncomponent';
import ImageSwiper from './components/ImageSwiper';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [subProductSelected, setSubProductSelected] = useState<SubProduct>();

  useEffect(() => {
    getProductDetail();
    getSubProducts();
  }, [id]);

  const getProductDetail = () => {
    productRef.doc(id).onSnapshot((snap: any) => {
      if (snap.exists) {
        setProductDetail({
          id,
          ...snap.data(),
        });
      } else {
        setProductDetail(undefined);
      }
    });
  };

  const getSubProducts = async () => {
    try {
      const snap = await firestore()
        .collection('subProducts')
        .where('productId', '==', id)
        .get();

      if (snap.empty) {
        setSubProducts([]);
        setSubProductSelected(undefined);
      } else {
        const items: SubProduct[] = [];

        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });

        setSubProducts(items);
        setSubProductSelected(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[globalStyles.container, {backgroundColor: 'white'}]}>
      <View style={[globalStyles.container]}>
        {subProductSelected && <ImageSwiper ids={subProductSelected.files} />}
      </View>
      <View style={[globalStyles.container, globalStyles.center]}>
        <TextComponent text="Colors" />
        <Space height={12} />
        {subProducts.length > 0 &&
          subProducts.map(item => (
            <TouchableOpacity
              onPress={() => setSubProductSelected(item)}
              key={item.id}
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: item.color,
                borderColor: 'coral',
                borderWidth: 1,
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default ProductDetail;
