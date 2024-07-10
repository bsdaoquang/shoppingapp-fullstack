import {
  Button,
  Col,
  Row,
  Section,
  Space,
  Tabbar,
  colors,
  globalStyles,
} from '@bsdaoquang/rncomponent';
import firestore from '@react-native-firebase/firestore';
import {SearchNormal1, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {CategoryModel} from '../../models/CategoryModel';
import RNRangeSlider from 'rn-range-slider';
import {ProductModel} from '../../models/ProductModel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FilterScreen = ({navigation}: any) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValues, setFilterValues] = useState<{
    categories: string[];
    price: {
      low: number;
      high: number;
    };
    sortby: string;
    rate: number;
  }>({
    categories: [],
    price: {
      low: 0,
      high: 1000,
    },
    sortby: 'today',
    rate: 5,
  });

  const sortbyValues = [
    {
      key: 'today',
      title: 'New Today',
    },
    {
      key: 'thisweek',
      title: 'New This Week',
    },
    {
      key: 'bestseller',
      title: 'Best Seller',
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      await getCategories();
      await handleGetMaxPrice();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    const snap = await firestore().collection('categories').get();

    if (!snap.empty) {
      const items: CategoryModel[] = [];
      snap.forEach((item: any) => items.push({id: item.id, ...item.data()}));
      handleSelectCategory(items[0].id);
      setCategories(items);
    }
  };

  const handleSelectCategory = (id: string) => {
    const items = [...filterValues.categories];
    const index = items.findIndex(element => element === id);

    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }
    setFilterValues({...filterValues, categories: items});
  };

  const handleGetMaxPrice = async () => {
    const snap = await firestore()
      .collection('products')
      .orderBy('price')
      .limitToLast(1)
      .get();

    if (!snap.empty) {
      const items: ProductModel[] = [];
      snap.forEach((item: any) => {
        items.push({...item.data()});
      });

      items.length > 0 && setMaxPrice(items[0].price);
      setFilterValues({...filterValues, price: {low: 0, high: items[0].price}});
    }
  };

  return isLoading ? (
    <Section>
      <ActivityIndicator />
    </Section>
  ) : (
    <Container
      bottomComponent={
        <Section>
          <Button
            inline
            title="Apply"
            onPress={() => navigation.navigate('ResultScreen', {filterValues})}
            color={colors.black}
          />
        </Section>
      }
      back
      right={
        <TouchableOpacity>
          <SearchNormal1 size={24} color={colors.gray800} />
        </TouchableOpacity>
      }>
      <Section>
        <Tabbar
          showSeeMore={false}
          titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
          title="Categories"
        />
        <Row wrap="wrap" justifyContent="flex-start">
          {categories.map(item => (
            <TouchableOpacity
              onPress={() => handleSelectCategory(item.id)}
              style={[
                globalStyles.tag,
                {
                  borderWidth: 1,
                  borderRadius: 100,
                  paddingVertical: 8,
                  borderColor: colors.gray500,
                  paddingHorizontal: 20,
                  backgroundColor: filterValues.categories.includes(item.id)
                    ? colors.black
                    : colors.white,
                },
              ]}
              key={item.id}>
              <TextComponent
                color={
                  filterValues.categories.includes(item.id)
                    ? colors.white
                    : colors.black
                }
                font={fontFamilies.poppinsMedium}
                text={item.title}
              />
            </TouchableOpacity>
          ))}
        </Row>
      </Section>
      <Section>
        <Tabbar
          showSeeMore={false}
          titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
          title="Price"
        />
        <Space height={12} />
        <RNRangeSlider
          min={0}
          step={1}
          max={maxPrice}
          renderThumb={name => (
            <View>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderWidth: 2,
                  borderColor: colors.gray700,
                  borderRadius: 100,
                  backgroundColor: colors.white,
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  left: -20,
                  bottom: 16,
                  width: 50,
                  alignItems: 'center',
                }}>
                <TextComponent
                  size={12}
                  color={colors.gray600}
                  text={
                    name === 'low'
                      ? `$${filterValues.price.low}`
                      : `$${filterValues.price.high.toLocaleString()}`
                  }
                />
              </View>
            </View>
          )}
          renderRail={() => (
            <View
              style={{
                height: 3,
                width: '100%',
                backgroundColor: colors.gray400,
              }}
            />
          )}
          renderRailSelected={() => (
            <View
              style={{
                height: 3,
                width: '100%',
                backgroundColor: colors.gray800,
              }}
            />
          )}
          onSliderTouchEnd={(low, high) =>
            setFilterValues({...filterValues, price: {low, high}})
          }
          onValueChanged={(low, high) => {}}
        />
        <Row styles={{marginTop: 8}} justifyContent="space-between">
          <TextComponent
            text={`$0`}
            size={18}
            color={colors.gray500}
            font={fontFamilies.poppinsMedium}
          />

          <TextComponent
            text={`$${maxPrice.toLocaleString()}`}
            size={18}
            color={colors.gray500}
            font={fontFamilies.poppinsMedium}
          />
        </Row>
      </Section>
      <Section>
        <Tabbar
          showSeeMore={false}
          titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
          title="Sort by"
        />
        <Row wrap="wrap" justifyContent="flex-start">
          {sortbyValues.map(item => (
            <TouchableOpacity
              onPress={() =>
                setFilterValues({...filterValues, sortby: item.key})
              }
              style={[
                globalStyles.tag,
                {
                  borderWidth: 1,
                  borderRadius: 100,
                  paddingVertical: 8,
                  borderColor: colors.gray500,
                  paddingHorizontal: 10,
                  backgroundColor:
                    filterValues.sortby === item.key
                      ? colors.black
                      : colors.white,
                },
              ]}
              key={item.key}>
              <TextComponent
                color={
                  filterValues.sortby === item.key ? colors.white : colors.black
                }
                font={fontFamilies.poppinsMedium}
                text={item.title}
              />
            </TouchableOpacity>
          ))}
        </Row>
      </Section>
      <Section>
        <Tabbar
          showSeeMore={false}
          titleStyleProps={{fontFamily: fontFamilies.poppinsBold, fontSize: 18}}
          title="Rating"
        />
        {Array.from({length: 5}).map(
          (item, index) =>
            5 - index > 1 && (
              <Row
                onPress={() =>
                  setFilterValues({...filterValues, rate: 5 - index})
                }
                key={`rating${index}`}
                styles={{marginBottom: 12}}>
                <Col>
                  <Row justifyContent="flex-start">
                    {Array.from({length: 5 - index}).map((star, index) => (
                      <AntDesign
                        style={{marginRight: 8}}
                        name="star"
                        color={colors.warning}
                        size={20}
                        key={`star-${index}`}
                      />
                    ))}
                  </Row>
                </Col>
                {5 - index === filterValues.rate ? (
                  <TickCircle size={24} color={colors.black} variant="Bold" />
                ) : (
                  <FontAwesome name="circle" color={colors.gray300} size={24} />
                )}
              </Row>
            ),
        )}
      </Section>
    </Container>
  );
};

export default FilterScreen;
