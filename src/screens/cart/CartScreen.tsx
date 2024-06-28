import {
  Badge,
  Button,
  Card,
  Col,
  Row,
  Section,
  Space,
} from '@bsdaoquang/rncomponent';
import {Add, ArrowRight2, Minus} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  CartItem,
  cartSelector,
  updateQuantity,
} from '../../redux/reducers/cartReducer';
import {globalStyles} from '../../styles/globalStyles';

const CartScreen = ({navigation}: any) => {
  const cartData: CartItem[] = useSelector(cartSelector);
  const dispatch = useDispatch();

  return (
    <Container
      back
      isScroll={false}
      right={
        <Badge count={cartData.length}>
          <View
            style={[
              globalStyles.center,
              {
                backgroundColor: colors.white,
                borderRadius: 100,
                padding: 0,
                width: 42,
                height: 42,
                zIndex: -1,
              },
            ]}>
            <MaterialCommunityIcons
              name="shopping"
              size={22}
              color={colors.dark}
            />
          </View>
        </Badge>
      }>
      {cartData.length > 0 ? (
        <View style={{flex: 1}}>
          <Section>
            <TextComponent type="title" text="My cart" size={18} />
          </Section>
          <View style={{flex: 1}}>
            <FlatList
              data={cartData}
              renderItem={({item, index}) => (
                <Card key={item.id}>
                  <Row alignItems="flex-start">
                    <Image
                      source={{uri: item.imageUrl}}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 12,
                        resizeMode: 'cover',
                      }}
                    />
                    <Space width={12} />
                    <Col>
                      <TextComponent type="title" text={item.title} />
                      <TextComponent
                        text={item.description}
                        numberOfLine={1}
                        color={colors.description}
                      />
                      <Row flex={1} alignItems="flex-end">
                        <Col>
                          <TextComponent
                            text={`$${item.price * item.quantity}`}
                            type="title"
                            size={18}
                          />
                        </Col>
                        <Row
                          styles={{
                            backgroundColor: '#e0e0e0',
                            paddingVertical: 4,
                            borderRadius: 100,
                            paddingHorizontal: 12,
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: -1,
                                }),
                              )
                            }>
                            <Minus size={20} color={colors.dark} />
                          </TouchableOpacity>
                          <Space width={6} />
                          <TextComponent text={`${item.quantity}`} />
                          <Space width={6} />
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: 1,
                                }),
                              )
                            }>
                            <Add size={20} color={colors.dark} />
                          </TouchableOpacity>
                        </Row>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          </View>
          <Section>
            <Row styles={{marginBottom: 16}}>
              <Col>
                <TextComponent
                  text={`Total (${cartData.length} items)`}
                  color={colors.description}
                />
              </Col>
              <TextComponent
                text={`$${cartData
                  .reduce((a, b) => a + b.quantity * b.price, 0)
                  .toLocaleString()}`}
                type="title"
                size={18}
                font={fontFamilies.poppinsBold}
              />
            </Row>
            <Button
              color={colors.dark}
              title={'Proceed to Checkout'}
              onPress={() => {}}
              iconPosition="right"
              iconExtra
              icon={<ArrowRight2 size={20} color="white" />}
              inline
            />
          </Section>
        </View>
      ) : (
        <Section>
          <TextComponent text="No product in your cart" />
        </Section>
      )}
    </Container>
  );
};

export default CartScreen;
