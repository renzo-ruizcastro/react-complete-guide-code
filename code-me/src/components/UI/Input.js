import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* input => {id: "a1", type: "number"} */}
      <input {...props.input} ref={ref} />
      {/* <input id="a1" type="number"/> */}
    </div>
  );
});

export default Input;
