import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import { sendCartData } from './store/cart-slice';
// import { firebaseClient } from './api';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartShown = useSelector(state => state.ui.isCartShown);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'pending',
    //       title: 'Sending...',
    //       message: 'Sending cart data!',
    //     })
    //   );
    //   try {
    //     const response = await axios.put(
    //       'https://react-advanced-redux-500a6-default-rtdb.firebaseio.com/cart.json',
    //       cart
    //     );
    //     const responseStatus = response.status;
    //     if (responseStatus !== 200) {
    //       throw new Error('Sending cart data failed.');
    //     }
    //     dispatch(
    //       uiActions.showNotification({
    //         status: 'success',
    //         title: 'Success!',
    //         message: 'Sent cart data successfully!',
    //       })
    //     );
    //   } catch (e) {
    //     dispatch(
    //       uiActions.showNotification({
    //         status: 'error',
    //         title: 'Error!',
    //         message: 'Sending cart data failed!',
    //       })
    //     );
    //   }
    // };
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
    // sendCartData();
  }, [cart, dispatch]); // Even if we add dispatch to the dependency array, react redux will ensure that it will never trigger a re-render cycle.

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartShown && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
