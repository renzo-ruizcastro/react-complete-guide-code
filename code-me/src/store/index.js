import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import cartReducer from './cart/cart-slice';

const store = configureStore({
  reducer: { ui: uiReducer, cart: cartReducer },
});

export default store;

// Redux toolkit gives straight connection to Redux DevTools
