import {
  Button,
  Input,
  Row,
  Section,
  Space,
  Text,
} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {TickCircle, TickSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, Platform} from 'react-native';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Auth} from '../../utils/handleAuthen';

const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
};

const SignUp = ({navigation}: any) => {
  const [registerForm, setRegisterForm] = useState(initState);
  const [isDisable, setIsDisable] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {email, password, confirm} = registerForm;
    if (password && confirm) {
      setErrorText(password !== confirm ? 'Password is not match!!' : '');
    }

    setIsDisable(false);
  }, [registerForm]);

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
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        registerForm.email,
        registerForm.password,
      );
      const user = userCredential.user;
      if (user) {
        if (registerForm.username) {
          await user.updateProfile({
            displayName: registerForm.username,
          });
        }
        await Auth.CreateProfile();
        navigation.navigate('Result');
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorText(error.message);
      setIsLoading(false);
    }
  };

  const renderButtonRegister = () => {
    return (
      <Button
        loading={isLoading}
        disable={isDisable}
        isShadow={false}
        title="Sign Up"
        textStyleProps={{fontFamily: fontFamilies.poppinsBold}}
        color={colors.dark}
        inline
        onPress={createNewAccount}
      />
    );
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
        <Text
          text="Sign Up"
          weight={'700'}
          font={fontFamilies.poppinsBold}
          size={Platform.OS === 'ios' ? 20 : 18}
        />
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
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
              paddingHorizontal: 0,
            }}
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
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
              paddingHorizontal: 0,
            }}
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
              paddingHorizontal: 0,
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
              paddingHorizontal: 0,
            }}
            onChange={val => {
              handleChangeForm(val, 'confirm');
            }}
            placeholder="Confirm"
            label="Confirm"
          />
        </Section>
        {errorText && (
          <Section>
            <Text text={errorText} color={'coral'} />
          </Section>
        )}
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

        <Section>{renderButtonRegister()}</Section>

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
