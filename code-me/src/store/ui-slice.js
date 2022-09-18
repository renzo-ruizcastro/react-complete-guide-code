import { createSlice } from '@reduxjs/toolkit';
const initialState = { isCartShown: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleShowCart(state) {
      state.isCartShown = !state.isCartShown;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
