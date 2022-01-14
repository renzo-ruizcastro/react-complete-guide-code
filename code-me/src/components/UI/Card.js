import styles from './Card.module.css';

const Card = props => {
  return (
    // Seems like adding a falsable className with CSS modules doesn't imply a falsy value returned.
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
