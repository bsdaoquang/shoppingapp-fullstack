import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [isVie, setisVie] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 32,
          fontFamily: isVie ? 'Roboto-Bold' : 'Poppins-Bold',
        }}>
        Lập trình Đào Quang
      </Text>

      <Button title="Change Font" onPress={() => setisVie(!isVie)} />
    </View>
  );
};

export default App;
