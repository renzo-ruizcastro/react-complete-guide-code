import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  // name is mandatory
  name: 'counter',
  // initialState is an object
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // Here we can mutate the state directly
      // redux-toolkit uses immer to manage this mutation-like behavior
      // https://redux-toolkit.js.org/usage/immer-reducers
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // The field name is payload, not value
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
