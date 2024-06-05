import React from 'react';
import {Container, TextComponent} from '../../components';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const user = auth().currentUser;

  return (
    <Container>
      <TextComponent text="Home screen" />
    </Container>
  );
};

export default HomeScreen;
