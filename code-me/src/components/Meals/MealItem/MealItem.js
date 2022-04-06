import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';

const MealItem = props => {
  const CartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addItemToCartHandler = amount => {
    CartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
