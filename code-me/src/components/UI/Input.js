import styles from './Input.module.css';

const Input = props => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* input => {id: "a1", type: "number"} */}
      <input {...props.input} /> {/* <input id="a1" type="number"/> */}
    </div>
  );
};

export default Input;
