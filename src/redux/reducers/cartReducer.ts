import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const handleSyncCardData = async (data: any[]) => {
  await AsyncStorage.setItem('cart', JSON.stringify(data));
};

export interface CartItem {
  color: string;
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
  title: string;
}

const initialState: CartItem[] = [];

const cartSlicer = createSlice({
  name: 'cart',
  initialState: {
    cartData: initialState
  },
  reducers: {
    addcart: (state, action) => {
      const items: any = state.cartData;
      const item = action.payload;
      const index = items.findIndex((element: any) => element.id === item.id);

      if (index !== -1) {
        items[index].quantity = item.quantity;
      } else {
        items.push(item);
      }

      state.cartData = items;
      handleSyncCardData(items);
    },
    removecart: (state, action) => {
      state.cartData = [];
    },
    updateQuantity: (state, action) => {
      const items = [...state.cartData];
      const data = action.payload;
      const item = items.find(element => element.id === data.id);
      const index = items.findIndex(element => element.id === data.id);

      if (item && index !== -1) {
        const quantity = item.quantity + data.quantity;

        if (quantity === 0) {
          items.splice(index, 1);
        } else {
          item.quantity = quantity;
        }
      }

      state.cartData = items;
    },
    syncLocalStorage: (state, action) => {
      state.cartData = action.payload;
    }
  }
});

export const cartReducer = cartSlicer.reducer;
export const { addcart, removecart, syncLocalStorage, updateQuantity } = cartSlicer.actions;
export const cartSelector = (state: any) => state.cartReducer.cartData;