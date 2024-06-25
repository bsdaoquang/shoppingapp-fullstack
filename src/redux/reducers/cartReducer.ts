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
  price: string;
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
    syncLocalStorage: (state, action) => {
      state.cartData = action.payload;
    }
  }
});

export const cartReducer = cartSlicer.reducer;
export const { addcart, removecart, syncLocalStorage } = cartSlicer.actions;
export const cartSelector = (state: any) => state.cartReducer.cartData;