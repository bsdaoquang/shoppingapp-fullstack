import {
  Button,
  CheckboxItem,
  Input,
  Row,
  Section,
  Space,
  Text,
} from '@bsdaoquang/rncomponent';
import {TickCircle, TickSquare} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';

const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
};

const SignUp = ({navigation}: any) => {
  const [registerForm, setRegisterForm] = useState(initState);

  const handleChangeForm = (val: string, key: string) => {
    const items: any = {...registerForm};

    if (val && key) {
      items[`${key}`] = val;

      setRegisterForm(items);
    } else {
      console.log('Missing values');
    }
  };

  const createNewAccount = async () => {
    console.log(registerForm);
  };

  return (
    <Container>
      <Section>
        <Row styles={{paddingVertical: 20, paddingTop: 32}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
        </Row>
      </Section>
      <Section>
        <Text text="Sign Up" font={fontFamilies.poppinsBold} size={18} />
        <Text text="Create an new account" color={colors.description} />
      </Section>
      <>
        <Section>
          <Input
            value={registerForm.username}
            radius={0}
            color="transparent"
            bordered={false}
            labelStyleProps={{
              marginBottom: 0,
            }}
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            onChange={val => handleChangeForm(val, 'username')}
            placeholder="User name"
            clear
            label="User name"
          />
          <Input
            required
            helpText="Please enter your email"
            value={registerForm.email}
            radius={0}
            color="transparent"
            bordered={false}
            labelStyleProps={{
              marginBottom: 0,
            }}
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            onChange={val => handleChangeForm(val, 'email')}
            placeholder="Email"
            clear
            keyboardType="email-address"
            label="Email"
            affix={
              registerForm.email &&
              registerForm.email.includes('@') &&
              registerForm.email.includes('.') ? (
                <TickCircle variant="Bold" size={20} color={colors.dark} />
              ) : null
            }
          />
          <Input
            value={registerForm.password}
            radius={0}
            color="transparent"
            password
            labelStyleProps={{
              marginBottom: 0,
            }}
            bordered={false}
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
            }}
            onChange={val => {
              handleChangeForm(val, 'password');
            }}
            placeholder="Password"
            label="Password"
          />
          <Input
            value={registerForm.confirm}
            radius={0}
            color="transparent"
            password
            labelStyleProps={{
              marginBottom: 0,
            }}
            bordered={false}
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
            }}
            onChange={val => {
              handleChangeForm(val, 'confirm');
            }}
            placeholder="Confirm"
            label="Confirm"
          />
        </Section>

        <Section>
          <Row alignItems="flex-start">
            <TickSquare size={20} variant="Bold" color={colors.description} />
            <Space width={8} />
            <Text
              text="By create an acount, you have agree with out term & condication"
              color={colors.description}
            />
          </Row>
        </Section>

        <Section>
          <Button
            title="Sign Up"
            textStyleProps={{fontFamily: fontFamilies.poppinsBold}}
            color={colors.dark}
            inline
            onPress={createNewAccount}
          />
        </Section>

        <Row styles={{paddingHorizontal: 16, marginBottom: 16}}>
          <Text text="You have account? " />
          <Button
            title="Login"
            inline
            onPress={() => navigation.navigate('Login')}
            type="link"
          />
        </Row>
      </>
    </Container>
  );
};

export default SignUp;
