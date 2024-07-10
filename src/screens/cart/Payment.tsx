import {
  Button,
  Card,
  Col,
  Row,
  Section,
  Space,
  colors,
} from '@bsdaoquang/rncomponent';
import {AddCircle} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Container, TextComponent} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore, {where, onSnapshot} from '@react-native-firebase/firestore';
import {PaymentModel} from '../../models/PaymentModel';
import {Image} from 'react-native';

const Payment = ({navigation}: any) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentModel[]>([]);
  const [paymentHistories, setPaymentHistories] = useState([]);

  const user = auth().currentUser;

  useEffect(() => {
    firestore()
      .collection('payments')
      .onSnapshot(snap => {
        if (!snap.empty) {
          const items: PaymentModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );
          setPaymentMethods(items);
        }
      });
  }, []);

  return (
    <Container back>
      <Section>
        <TextComponent type="title" text="Payment" />
      </Section>

      <Section>
        {paymentMethods.length > 0 &&
          paymentMethods.map(item => (
            <Card styles={{marginHorizontal: 0}}>
              <Row>
                {item.icon && (
                  <Image
                    source={{
                      uri: item.icon,
                    }}
                    style={{
                      borderRadius: 100,
                      width: 32,
                      height: 32,
                    }}
                  />
                )}
                <Space width={16} />
                <Col>
                  <TextComponent text={item.title ?? ''} />
                </Col>
              </Row>
            </Card>
          ))}
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
