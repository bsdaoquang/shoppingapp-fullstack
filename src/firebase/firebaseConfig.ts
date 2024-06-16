import firestore from '@react-native-firebase/firestore';


const productRef = firestore().collection('products');


export {
  productRef
};