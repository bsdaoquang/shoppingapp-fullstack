import React from 'react';
import {View} from 'react-native';
import {TextComponent} from './src/components';
import {fontFamilies} from './src/constants/fontFamilies';
import {globalStyles} from './src/styles/globalStyles';

const App = () => {
  return (
    <View style={[globalStyles.container, globalStyles.center]}>
      <TextComponent
        numberOfLine={1}
        text="Hello work"
        type="bigTitle"
        size={22}
        font={fontFamilies.poppinsBold}
      />
    </View>
  );
};

export default App;
