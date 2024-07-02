import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {Container, TextComponent} from '../../components';
import {Button, Col, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import {colors} from '../../constants/colors';

const AddPayment = ({navigation}: any) => {
  const [cardDetail, setCardDetail] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleChangeData = (val: string, key: string) => {
    const items: any = {...cardDetail};

    items[`${key}`] = val;

    setCardDetail(items);
  };

  const handleAddPaymenMethod = async () => {};

  return (
    <Container back>
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
        <Input
          value={cardDetail.cardNumber}
          onChange={val => handleChangeData(val, 'cardNumber')}
          placeholder="Card Number"
          keyboardType="number-pad"
          radius={12}
        />
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
              onPress={() => navigation.goBack()}
            />
          </Col>
        </Row>
      </Section>
    </Container>
  );
};

export default AddPayment;
