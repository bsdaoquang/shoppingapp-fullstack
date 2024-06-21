import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import messaging from '@react-native-firebase/messaging';
import {HambergerMenu, SearchNormal1, Setting4} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import Avatar from '../../components/Avatar';
import {colors} from '../../constants/colors';
import ArrivalsProduct from './components/ArrivalsProduct';
import CategoriesList from './components/CategoriesList';
import OffersList from './components/OffersList';
import PopularProduct from './components/PopularProduct';

const HomeScreen = () => {
  useEffect(() => {
    messaging().onMessage(mess => {
      console.log(mess);
    });
  }, []);

  return (
    <Container isScroll={false}>
      <Section styles={{paddingTop: 16}}>
        <Row justifyContent="space-between">
          <Button
            inline
            styles={{width: 48, height: 48}}
            icon={<HambergerMenu size={24} color="white" />}
            color="black"
            onPress={() => {}}
          />
          <Avatar />
        </Row>
      </Section>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <>
          <Section>
            <TextComponent type="title" text="Welcome," size={24} />
            <TextComponent
              text="Our fashion app"
              size={18}
              color={colors.gray2}
            />
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
        </>
        <OffersList />
        <Space height={20} />
        <CategoriesList />
        <Space height={20} />
        <ArrivalsProduct />
        <Space height={20} />
        <PopularProduct />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
