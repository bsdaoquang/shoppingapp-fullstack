import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface ProductModel {
  id: string;
  type: string;
  description: string;
  price: string;
  title: string;
  imageUrl: string;
  files: string[];
  categories: string[];
  createdAt: number;
  updatedAt: number;
}
