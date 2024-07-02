import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Container, TextComponent} from '../../components';
import {Button, Section, colors} from '@bsdaoquang/rncomponent';
import {AddCircle} from 'iconsax-react-native';

const Payment = ({navigation}: any) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentHistories, setPaymentHistories] = useState([]);

  return (
    <Container back>
      <Section>
        <TextComponent type="title" text="Payment" />
      </Section>
      <Section>
        {/* Payment method */}
        <Button
          icon={<AddCircle size={20} color={colors.gray700} />}
          title="Add Card"
          radius={12}
          type="dashed"
          isShadow={false}
          // color="transparent"
          onPress={() => navigation.navigate('AddPayment')}
        />
      </Section>
      {/* <Section>Payment histories</Section> */}
    </Container>
  );
};

export default Payment;
