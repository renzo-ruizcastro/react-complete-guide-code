import { uiActions } from '../ui-slice';
import { firebaseClient } from '../../api';
import { cartActions } from './cart-slice';

;

export const fetchCartData = () => {
  return async dispatch => {
    try {
      const response = await firebaseClient.get('/cart.json');
      console.log(response);
      const data = response.data;
      if (!data) {
        throw new Error('No data found');
      }
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
          totalAmount: data.totalAmount,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendCartData = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );
    try {
      const response = await firebaseClient.put('/cart.json', {
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalAmount: cart.totalAmount,
      });
      if (response.status !== 200) {
        throw new Error('Sending cart data failed.');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
