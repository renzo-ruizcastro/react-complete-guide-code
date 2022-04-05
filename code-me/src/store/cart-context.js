// store is a convention as a name for a application state management folder
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: id => {},
});

export default CartContext;
