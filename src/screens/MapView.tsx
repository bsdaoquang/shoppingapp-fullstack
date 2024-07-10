import {View, Text} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {sizes} from '../constants/sizes';

const MapScreen = ({navigation, route}: any) => {
  const {position} = route.params;
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1, width: sizes.width, height: sizes.height}}
        initialRegion={{
          longitude: position.lng,
          latitude: position.lat,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          longitude: position.lng,
          latitude: position.lat,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton>
        <Marker
          title="afafa"
          description=";;"
          coordinate={{
            latitude: position.lat,
            longitude: position.lng,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
