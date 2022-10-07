import axios from 'axios';
export const firebaseClient = axios.create({
  baseURL: 'https://react-advanced-redux-500a6-default-rtdb.firebaseio.com',
});
