import firestore from '@react-native-firebase/firestore';


const productRef = firestore().collection('products');
const categoriesRef = firestore().collection('categories');


export {
  productRef,
  categoriesRef
};