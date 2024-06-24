import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const handleSyncCardData = async (data: any[]) => {
  await AsyncStorage.setItem('cart', JSON.stringify(data));
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState: {
    cartData: []
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
    }
  }
});

export const cartReducer = cartSlicer.reducer;
export const { addcart, removecart } = cartSlicer.actions;
export const cartSelector = (state: any) => state.cartReducer.cartData;