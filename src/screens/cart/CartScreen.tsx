import {Badge, Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {cartSelector} from '../../redux/reducers/cartReducer';
import {globalStyles} from '../../styles/globalStyles';
import * as Components from '@bsdaoquang/rncomponent';

const CartScreen = ({navigation}: any) => {
  const cartData = useSelector(cartSelector);

  return (
    <Container
      back
      right={
        <Badge count={cartData.length}>
          <View
            style={[
              globalStyles.center,
              Components.globalStyles.shadow,
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
      <Section>
        <TextComponent text="Card" />
      </Section>
    </Container>
  );
};

export default CartScreen;
