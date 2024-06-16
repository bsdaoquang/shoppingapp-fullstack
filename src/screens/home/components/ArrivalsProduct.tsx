import {Row, Tabbar} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ProductItem, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {sizes} from '../../../constants/sizes';
import {productRef} from '../../../firebase/firebaseConfig';
import {ProductModel} from '../../../models/ProductModel';

type Props = {};

const ArrivalsProduct = (props: Props) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    productRef
      .orderBy('createdAt')
      .limit(10)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`Products not found!`);
        } else {
          const items: ProductModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setProducts(items);
        }
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Tabbar
        title="New Arrivals"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20}}
        renderSeemore={<TextComponent text="View all" color={colors.gray2} />}
        onSeeMore={() => {}}
      />

      {products.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={products}
          renderItem={({item, index}) => (
            <View
              key={item.id}
              style={{
                marginLeft: 16,
                marginRight: index === products.length - 1 ? 16 : 0,
              }}>
              <ProductItem product={item} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default ArrivalsProduct;
