import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import OfferItem from '../../../components/OfferItem';
import {collectionNames} from '../../../constants/collectionNames';
import {OfferModel} from '../../../models/OfferModel';

type Props = {};

const OffersList = (props: Props) => {
  const [offers, setOffers] = useState<OfferModel[]>([]);

  const time = new Date().getTime();
  useEffect(() => {
    firestore()
      .collection(collectionNames.offers)
      .where('startAt', '<=', time)
      // .where('endAt', '>=', time)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('Offer active not found');
        } else {
          const items: OfferModel[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });

          setOffers(items);
        }
      });
  }, []);

  return (
    <>
      <FlatList
        style={{paddingLeft: 16}}
        data={offers}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => <OfferItem item={item} key={item.id} />}
      />
    </>
  );
};

export default OffersList;
