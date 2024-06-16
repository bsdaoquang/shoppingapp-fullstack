import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Tabbar} from '@bsdaoquang/rncomponent';
import {TextComponent} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {CategoryModel} from '../../../models/CategoryModel';
import {categoriesRef} from '../../../firebase/firebaseConfig';

const CategoriesList = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    categoriesRef.onSnapshot(snap => {
      if (snap.empty) {
        console.log(`Products not found!`);
      } else {
        const items: CategoryModel[] = [];
        snap.forEach((item: any) =>
          items.push({
            id: item.id,
            ...item.data(),
          }),
        );
        setCategories(items);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Tabbar
        title="Categories"
        tabbarStylesProps={{paddingHorizontal: 16}}
        titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 20}}
        renderSeemore={<TextComponent text="View all" color={colors.gray2} />}
        onSeeMore={() => {}}
      />

      {categories.length > 0 && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={({item, index}) => (
            <View
              key={item.id}
              style={{
                marginLeft: 16,
                marginRight: index === categories.length - 1 ? 16 : 0,
              }}>
              <Button
                title={item.title}
                onPress={() => {}}
                color={colors.dark}
                styles={{
                  paddingVertical: 4,
                  paddingHorizontal: 20,
                }}
                inline
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default CategoriesList;
