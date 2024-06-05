import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: '',
  email: '',
};

const authSlicer = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = initialState;
    }
  }
});

export const authReducer = authSlicer.reducer;
export const { addAuth, removeAuth } = authSlicer.actions;
export const authSelector = (state: any) => state.authReducer.authData;