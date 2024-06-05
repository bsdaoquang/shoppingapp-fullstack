import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Container, TextComponent} from '../../components';
import {Button, Section, Space, Text} from '@bsdaoquang/rncomponent';
import {globalStyles} from '../../styles/globalStyles';
import {TickCircle, Timer} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localDataNames} from '../../constants/localDataNames';

const Result = ({navigation, route}: any) => {
  const user = auth().currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    const timout = setTimeout(() => {
      handleSaveUser();
    }, 5000);

    return () => clearTimeout(timout);
  }, []);

  const handleSaveUser = async () => {
    if (user) {
      const data = {
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      };
      dispatch(addAuth(data));
      await AsyncStorage.setItem(localDataNames.auth, JSON.stringify(data));
    }
  };
  return (
    <Container isScroll={false}>
      <Section styles={[globalStyles.center, {flex: 1}]}>
        <TickCircle color={colors.success} size={80} />
        <Space height={16} />
        <Text
          text="Successfully!!"
          font={fontFamilies.poppinsBold}
          weight={'700'}
          size={20}
        />
        <Text
          textAlign="center"
          size={14}
          font={fontFamilies.poppinsRegular}
          numberOfLine={2}
          color={colors.gray2}
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vitae reiciendis ullam est aut"
        />
      </Section>
      <Section>
        <Button
          onPress={handleSaveUser}
          title="Start shopping"
          color={colors.dark}
          textStyleProps={{
            fontWeight: '700',
            fontFamily: fontFamilies.poppinsBold,
          }}
        />
      </Section>
    </Container>
  );
};

export default Result;
