import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // Whenever the context changes the component will re-render
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  // items is an array of objects
  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    // Good practice to clean up side effects
    // cleanOut function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
