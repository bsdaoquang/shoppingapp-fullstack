import React from 'react';
import {Container, TextComponent} from '../../components';
import auth from '@react-native-firebase/auth';
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import Avatar from '../../components/Avatar';
import {
  HambergerMenu,
  SearchNormal1,
  Setting2,
  Setting4,
} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {View} from 'react-native';
import OffersList from './components/OffersList';

const HomeScreen = () => {
  const user = auth().currentUser;

  return (
    <Container>
      <Section styles={{paddingTop: 16}}>
        <Row justifyContent="space-between">
          <Button
            styles={{width: 48, height: 48}}
            icon={<HambergerMenu size={24} color="white" />}
            color="black"
            onPress={() => {}}
          />
          <Avatar />
        </Row>
      </Section>
      <Section>
        <TextComponent type="title" text="Welcome," size={24} />
        <TextComponent text="Our fashion app" size={18} color={colors.gray2} />
      </Section>
      <Section>
        <Row>
          <View style={{flex: 1}}>
            <Input
              disable
              placeholder="Search"
              placeholderColor={colors.gray2}
              prefix={<SearchNormal1 size={20} color={colors.dark} />}
              value=""
              onChange={() => {}}
            />
          </View>
          <Space width={12} />
          <Button
            styles={{width: 48, height: 48}}
            icon={<Setting4 variant="TwoTone" size={24} color="white" />}
            color="black"
            onPress={() => {}}
          />
        </Row>
      </Section>
      <OffersList />
    </Container>
  );
};

export default HomeScreen;
