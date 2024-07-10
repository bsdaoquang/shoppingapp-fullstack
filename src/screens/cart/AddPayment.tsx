import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, TextComponent} from '../../components';
import {
  Button,
  Col,
  Input,
  Row,
  Section,
  Space,
  globalStyles,
} from '@bsdaoquang/rncomponent';
import {colors} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../../constants/fontFamilies';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddPayment = ({navigation}: any) => {
  const user = auth().currentUser;

  const [cardDetail, setCardDetail] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  const [cardNumber, setCardNumber] = useState('');
  const [paymentType, setPaymentType] = useState<{
    icon: string;
    title: string;
    type: string;
    clientId: string;
  }>();

  const types = [
    {
      icon: 'https://img.icons8.com/color/48/paypal.png',
      title: 'PayPal',
      type: 'paypal',
      clientId: '',
    },
    {
      icon: 'https://img.icons8.com/color/48/google-logo.png',
      title: 'Google Pay',
      type: 'googlePay',
      clientId: '',
    },
    {
      icon: 'https://img.icons8.com/color/48/visa.png',
      title: 'Visa',
      type: 'visa',
      clientId: '',
    },
    {
      icon: 'https://img.icons8.com/color/48/mastercard.png',
      title: 'Credit card',
      type: 'creditCard',
      clientId: '',
    },
  ];

  const handleChangeCardnumber = (val: string) => {
    const str = val.match(/.{1,4}/g);
    let text = ``;
    str?.forEach(i => {
      text += i.length === 4 ? `${i} ` : i;
    });

    setCardNumber(text);

    /*
    ​​const parts = cleaned.match(/.{1,4}/g);
    if (parts) { 
      setFormattedNumber(parts.join('-')); 
    } else {
      setFormattedNumber(text); 
    }
    */
  };

  const handleChangeData = (val: string, key: string) => {
    const items: any = {...cardDetail};

    items[`${key}`] = val;

    setCardDetail(items);
  };

  const handleAddPaymenMethod = async () => {
    if (cardNumber.length >= 20) {
      try {
        const data = {
          ...cardDetail,
          cardNumber: cardNumber.replace(/ /g, ''),
          cvv: '',
          uid: user?.uid,
          ...paymentType,
        };

        await firestore().collection('payments').add(data);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('', 'Card number wrong!!');
    }
  };

  return (
    <Container back>
      <Section>
        <Row justifyContent="flex-start">
          {types.map(item => (
            <TouchableOpacity
              style={{
                marginRight: 12,
              }}
              onPress={() => setPaymentType(item)}>
              <Image
                source={{uri: item.icon}}
                style={{width: 38, height: 38, resizeMode: 'cover'}}
              />
            </TouchableOpacity>
          ))}
        </Row>
      </Section>
      <Section>
        <TextComponent text="Add Payment" type="title" />
        <Space height={12} />
        <Image
          source={require('../../assets/images/card-demo.webp')}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
      </Section>
      <Section>
        <TextComponent text="Card detail" type="title" />
      </Section>
      <Section>
        <Row
          styles={[
            globalStyles.inputContainer,
            {
              backgroundColor: 'white',
              marginBottom: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            },
          ]}>
          <TextInput
            style={[
              globalStyles.input,
              {
                padding: 0,
                margin: 0,
                fontFamily: fontFamilies.RobotoMedium,
                fontSize: 16,
              },
            ]}
            keyboardType="number-pad"
            placeholder="Card number"
            maxLength={19}
            value={cardNumber}
            onChangeText={val => handleChangeCardnumber(val.replace(/ /g, ''))}
          />

          {cardNumber && (
            <TouchableOpacity onPress={() => setCardNumber('')}>
              <AntDesign name="close" size={20} color={colors.gray2} />
            </TouchableOpacity>
          )}
        </Row>

        <Input
          value={cardDetail.expDate}
          onChange={val => handleChangeData(val, 'expDate')}
          placeholder="Exp Date"
          keyboardType="default"
          radius={12}
        />

        <Input
          value={cardDetail.cvv}
          onChange={val => handleChangeData(val, 'cvv')}
          placeholder="CVV"
          keyboardType="number-pad"
          radius={12}
        />
      </Section>
      <Section>
        <Row>
          <Col>
            <Button
              title="Cancel"
              type="text"
              onPress={() => navigation.goBack()}
            />
          </Col>
          <Col>
            <Button
              title="Confirm"
              color={colors.dark}
              onPress={handleAddPaymenMethod}
            />
          </Col>
        </Row>
      </Section>
    </Container>
  );
};

export default AddPayment;
