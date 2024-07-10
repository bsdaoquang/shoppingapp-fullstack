import {Col, Input, Row, Section, Space, colors} from '@bsdaoquang/rncomponent';
import Geolocation from '@react-native-community/geolocation';
import {ArrowRight2, SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Container, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {hereConfig} from '../../../hereconfig';
import axios from 'axios';
import {LocationModel} from '../../models/LocationModel';
import {add, debounce} from 'lodash';
import {FlatList, TouchableOpacity, View} from 'react-native';

const Address = ({navigation}: any) => {
  const [searchKey, setSearchKey] = useState('');
  const [position, setPosition] = useState<{
    lat: number;
    long: number;
  }>();
  const [address, setAddress] = useState<LocationModel>();
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    } else {
      const handleSearch = debounce(handleSearchLocation, 500);
      handleSearch();
    }
  }, [searchKey]);

  useEffect(() => {
    position && handleGetLocationAddress(position);
  }, [position]);

  const handleGetLocationAddress = async (data: {
    lat: number;
    long: number;
  }) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${data.lat},${data.long}&lang=vi-VN&apiKey=${hereConfig.apiKey}`;

    try {
      const res = await axios(api);

      if (res && res.status === 200 && res.data) {
        const items = res.data.items;

        items.length > 0 && setAddress(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&apiKey=${hereConfig.apiKey}`;

    try {
      const res = await axios(api);

      if (res && res.status === 200 && res.data) {
        const items = res.data.items;

        setLocations(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container isScroll={false} title="Address" back>
      <Section>
        <Input
          value={searchKey}
          onChange={val => setSearchKey(val)}
          clear
          prefix={<SearchNormal1 size={20} color={colors.gray} />}
          placeholder="Search address"
          inline
        />
      </Section>

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MapScreen', {
                position: address?.position,
              });
            }}
            style={{paddingHorizontal: 16}}>
            <TextComponent
              text={`Vị trí hiện tại`}
              font={fontFamilies.poppinsMedium}
            />
            <TextComponent
              text={address?.title ?? ''}
              size={12}
              color={colors.gray}
            />
          </TouchableOpacity>
        }
        data={locations}
        ListEmptyComponent={
          <Section
            styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextComponent text="Data not found" />
          </Section>
        }
        renderItem={({item}) => (
          <Row
            onPress={async () => {
              const api = `https://lookup.search.hereapi.com/v1/lookup?id=${item.id}&apiKey=${hereConfig.apiKey}`;

              try {
                const res = await axios(api);
                if (res && res.status === 200 && res.data) {
                  navigation.navigate('MapScreen', {
                    position: res.data?.position,
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }}
            styles={{
              marginHorizontal: 16,
              paddingVertical: 12,
              borderBottomColor: colors.gray300,
              borderBottomWidth: 1,
            }}>
            <Col>
              <TextComponent
                text={item.title}
                font={fontFamilies.poppinsMedium}
              />
              <TextComponent text={`4.5 Km`} size={12} color={colors.gray} />
            </Col>
            <Space width={12} />
            <ArrowRight2 size={22} color={colors.gray} />
          </Row>
        )}
      />
    </Container>
  );
};

export default Address;
