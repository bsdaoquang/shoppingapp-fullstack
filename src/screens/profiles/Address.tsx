import {Input, Section, colors} from '@bsdaoquang/rncomponent';
import Geolocation from '@react-native-community/geolocation';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Container, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {hereConfig} from '../../../hereconfig';
import axios from 'axios';
import {LocationModel} from '../../models/LocationModel';
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
      handleSearchLocation();
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
      <Section>
        <TextComponent text="My address" font={fontFamilies.poppinsMedium} />
        <TextComponent text={address ? address.title : ''} />
      </Section>
    </Container>
  );
};

export default Address;
