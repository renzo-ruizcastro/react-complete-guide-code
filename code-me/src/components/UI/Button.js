import styles from './Button.module.css';

const Button = props => {
  return (
    <button
      className={styles.button}
      type={props.type || 'button'}
      // Seems like recieving a falsy value just omits the attribute
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
