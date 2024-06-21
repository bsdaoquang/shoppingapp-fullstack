import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FileModel} from '../../../models/FileModel';
import firestore from '@react-native-firebase/firestore';
import Swiper from 'react-native-swiper';

type Props = {
  ids: string[];
};

const ImageSwiper = (props: Props) => {
  const {ids} = props;

  const [files, setFiles] = useState<FileModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(ids);
    // setIsLoading(true);
    // const items: FileModel[] = [...files];
    // ids.forEach(async id => {
    //   const snap = await getFileById(id);
    //   if (snap.exists) {
    //     items.push(snap.data());
    //     console.log(items.length);
    //   }
    //   setFiles(items);
    // });
    // setIsLoading(false);
  }, [ids]);

  const getFileById = async (id: string) => {
    try {
      const snap: any = await firestore().collection('files').doc(id).get();

      return snap;
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <Swiper>
      {files.length > 0 &&
        files.map(img => (
          <Image
            key={img.path}
            source={{
              uri: img.downloadUrl,
            }}
            style={{flex: 1, width: '100%'}}
          />
        ))}
    </Swiper>
  );
};

export default ImageSwiper;
