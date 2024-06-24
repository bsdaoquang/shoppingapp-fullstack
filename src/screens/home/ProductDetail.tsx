import {
  Badge,
  Button,
  Col,
  Row,
  Section,
  Space,
  colors,
  globalStyles,
} from '@bsdaoquang/rncomponent';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextComponent} from '../../components';
import {productRef} from '../../firebase/firebaseConfig';
import {ProductModel, SubProduct} from '../../models/ProductModel';
// import {globalStyles} from '../../styles/globalStyles';
import {useStatusBar} from '../../utils/useStatusBar';
import ImageSwiper from './components/ImageSwiper';
import {fontFamilies} from '../../constants/fontFamilies';
import {Add, Check, Minus, TickSquare} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [subProductSelected, setSubProductSelected] = useState<SubProduct>();
  const [count, setCount] = useState(1);
  const [sizeSelected, setSizeSelected] = useState('');

  useStatusBar('light-content');

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
        <Section
          styles={{
            zIndex: 5,
            position: 'absolute',
            top: 10,
            right: 0,
            left: 0,
            padding: 20,
          }}>
          <Row
            styles={{backgroundColor: 'transparent'}}
            justifyContent="space-between">
            <TouchableOpacity
              style={[
                globalStyles.center,
                {
                  backgroundColor: colors.gray800,
                  borderRadius: 100,
                  padding: 0,
                  width: 38,
                  height: 38,
                },
              ]}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                style={{marginLeft: 8}}
                name="arrow-back-ios"
                size={22}
                color={colors.white}
              />
            </TouchableOpacity>
            <Badge count={0}>
              <TouchableOpacity
                style={[
                  globalStyles.center,
                  {
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    padding: 0,
                    width: 38,
                    height: 38,
                  },
                ]}
                onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="shopping"
                  size={22}
                  color={colors.gray800}
                />
              </TouchableOpacity>
            </Badge>
          </Row>
        </Section>
        {subProductSelected && <ImageSwiper files={subProductSelected.files} />}
      </View>
      <ScrollView style={[globalStyles.container]}>
        {productDetail && subProductSelected && (
          <Section styles={{paddingVertical: 12}}>
            <Row>
              <Col>
                <TextComponent
                  text={productDetail?.title}
                  font={fontFamilies.RobotoBold}
                  size={20}
                />
                <TextComponent
                  text={productDetail.type}
                  color={colors.gray}
                  styles={{paddingVertical: 8}}
                />
              </Col>
              <View>
                <Row justifyContent="flex-end">
                  <Row
                    styles={{
                      backgroundColor: colors.gray300,
                      padding: 6,
                      borderRadius: 100,
                    }}>
                    <TouchableOpacity
                      disabled={subProductSelected.quantity === 0}
                      style={{paddingRight: 12}}
                      onPress={() => setCount(count + 1)}>
                      <Add size={24} color={colors.black} />
                    </TouchableOpacity>
                    <TextComponent text={count.toString()} size={16} />
                    <TouchableOpacity
                      style={{paddingLeft: 12}}
                      disabled={count === 1}
                      onPress={() => setCount(count - 1)}>
                      <Minus
                        size={24}
                        color={count === 1 ? colors.gray : colors.black}
                      />
                    </TouchableOpacity>
                  </Row>
                </Row>
                <Space height={12} />
                <TextComponent
                  text={`${
                    subProductSelected.quantity > 0
                      ? 'Avaliable'
                      : 'Unavaliable'
                  } in stok`}
                  font={fontFamilies.RobotoMedium}
                />
              </View>
            </Row>
            <Space height={20} />
            <Row>
              <Col>
                <View>
                  <TextComponent
                    font={fontFamilies.RobotoBold}
                    text="Size"
                    size={18}
                  />
                  <Space height={16} />
                  <Row wrap="wrap" justifyContent="flex-start">
                    {subProductSelected.size &&
                      subProductSelected.size.length > 0 &&
                      subProductSelected.size.map((itemSize, index) => (
                        <Button
                          color={
                            itemSize === sizeSelected ? colors.black : undefined
                          }
                          styles={{
                            minWidth: 50,
                            height: 50,
                            paddingHorizontal: 0,
                            marginRight:
                              index < subProductSelected.size.length - 1
                                ? 12
                                : 0,
                          }}
                          inline
                          textStyleProps={{
                            fontSize: 14,
                          }}
                          isShadow={false}
                          title={itemSize}
                          onPress={() => setSizeSelected(itemSize)}
                        />
                      ))}
                  </Row>
                </View>
              </Col>
              <View
                style={[
                  globalStyles.shadow,
                  {
                    marginHorizontal: 12,
                    padding: 12,
                    borderRadius: 100,
                    backgroundColor: 'white',
                  },
                ]}>
                {subProducts.length > 0 &&
                  subProducts.map(item => (
                    <TouchableOpacity
                      onPress={() => setSubProductSelected(item)}
                      key={item.id}
                      style={[
                        globalStyles.center,
                        {
                          width: 24,
                          height: 24,
                          borderRadius: 100,
                          backgroundColor: item.color,
                          marginVertical: 2,
                        },
                      ]}>
                      {item.color === subProductSelected.color && (
                        <MaterialCommunityIcons
                          name="check"
                          size={18}
                          color="white"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
              </View>
            </Row>
            <Space height={20} />
            <TextComponent
              font={fontFamilies.RobotoBold}
              text="Description"
              size={18}
            />
            <Space height={8} />
            <TextComponent
              text={productDetail.description}
              numberOfLine={5}
              styles={{textAlign: 'justify'}}
              color={colors.gray700}
            />
          </Section>
        )}
      </ScrollView>
      <Section styles={{backgroundColor: 'white'}}>
        <Row>
          <Col>
            <TextComponent text="Total price:" size={12} color={colors.gray} />
            <TextComponent
              text={`$123.00`}
              size={24}
              font={fontFamilies.poppinsBold}
            />
          </Col>
          <Col>
            <Button
              icon={
                <FontAwesome6 name="bag-shopping" size={18} color={'white'} />
              }
              inline
              onPress={() => {}}
              color={colors.black}
              title="Add to cart"
            />
          </Col>
        </Row>
      </Section>
    </View>
  );
};

export default ProductDetail;
