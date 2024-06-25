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
import {Add, Minus} from 'iconsax-react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {fontFamilies} from '../../constants/fontFamilies';
import {useStatusBar} from '../../utils/useStatusBar';
import ImageSwiper from './components/ImageSwiper';
import RatingComponent from './components/RatingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  CartItem,
  addcart,
  cartSelector,
} from '../../redux/reducers/cartReducer';
import {sizes} from '../../constants/sizes';

const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;

  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [subProductSelected, setSubProductSelected] = useState<SubProduct>();
  const [count, setCount] = useState(1);
  const [sizeSelected, setSizeSelected] = useState('');

  const cartData: CartItem[] = useSelector(cartSelector);
  const dispatch = useDispatch();

  useStatusBar('dark-content');

  useEffect(() => {
    getProductDetail();
    getSubProducts();
  }, [id]);

  useEffect(() => {
    setCount(1);
    setSizeSelected('');
  }, [subProductSelected]);

  useEffect(() => {
    if (subProductSelected) {
      const item = cartData.find(
        element => element.id === subProductSelected.id,
      );

      if (item) {
        setCount(item.quantity);
      }
    }
  }, [cartData, subProductSelected]);

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

  const handleAddToCard = (item: SubProduct) => {
    const data = {
      id: item.id,
      title: productDetail?.title,
      size: sizeSelected,
      quantity: count,
      description: productDetail?.description,
      color: item.color,
      price: item.price,
      imageUrl: item.imageUrl,
    };

    const sub: any = {...subProductSelected};
    sub.quantity = subProductSelected
      ? subProductSelected?.quantity - count
      : 0;

    dispatch(addcart(data));

    setSubProductSelected(sub);
  };

  const renderCartButton = () => {
    return (
      subProductSelected && (
        <Button
          disable={subProductSelected.quantity === 0}
          icon={<FontAwesome6 name="bag-shopping" size={18} color={'white'} />}
          inline
          onPress={() => handleAddToCard(subProductSelected)}
          color={colors.black}
          title={'Add to cart'}
        />
      )
    );
  };

  return (
    <>
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
          <Badge count={cartData.length}>
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
      <ScrollView
        style={[
          globalStyles.container,
          {backgroundColor: 'white', flexGrow: 1},
        ]}>
        <View
          style={[
            globalStyles.container,
            {
              height: sizes.height * 0.5,
            },
          ]}>
          {subProductSelected && (
            <View
              style={{
                width: sizes.width,
                height: sizes.height * 0.5,
              }}>
              <ImageSwiper files={subProductSelected.files} />
            </View>
          )}
        </View>
        <View
          style={[
            globalStyles.container,
            {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: -20,
              backgroundColor: 'white',
            },
          ]}>
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
                  <RatingComponent id={id} />
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
                            key={itemSize}
                            color={
                              itemSize === sizeSelected
                                ? colors.black
                                : undefined
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
                            marginVertical: 4,
                            borderWidth: 1,
                            borderColor: '#e0e0e0',
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
                styles={{textAlign: 'justify'}}
                size={12}
                color={colors.gray700}
              />
            </Section>
          )}
        </View>
      </ScrollView>
      <Section styles={{backgroundColor: 'white', paddingTop: 12}}>
        <Row>
          <Col>
            {subProductSelected && count && (
              <>
                <TextComponent
                  text="Total price:"
                  size={12}
                  color={colors.gray}
                />
                <TextComponent
                  text={`$${count * parseFloat(subProductSelected.price)}`}
                  size={24}
                  font={fontFamilies.poppinsBold}
                />
              </>
            )}
          </Col>
          <Col>{renderCartButton()}</Col>
        </Row>
      </Section>
    </>
  );
};

export default ProductDetail;
