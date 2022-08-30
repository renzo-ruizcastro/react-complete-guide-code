// import { createStore, combineReducers } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';
import authReducer from './auth-slice';

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
  // reducer: { counter: counterSlice.reducer, [...] },
});




// const countReducer = (state = initialState, action) => {
//   // The returns will not merge into the state, but replace it
//   // Never mutate the state, always return a new object using the state as a base
//   if (action.type === 'INCREMENT') {
//     return {
//       ...state,
//       counter: state.counter + 1,
//     };
//   }
//   if (action.type === 'DECREMENT') {
//     return {
//       ...state,
//       counter: state.counter - 1,
//     };
//   }
//   if (action.type === 'INCREASE') {
//     return {
//       ...state,
//       counter: state.counter + action.value,
//     };
//   }
//   if (action.type === 'TOGGLE_COUNTER') {
//     return {
//       ...state,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };

// const store = createStore(counterSlice.reducer);

export default store;
