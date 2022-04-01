import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // This function will be called from outside
  const focus = () => {
    inputRef.current.focus();
  };

  // Here you expose the focus function to the parent component
  // You may avoid it in most cases
  // In case of scrolling, focusing, this approach will be nice
  useImperativeHandle(ref, () => {
    return {
      focus: focus,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
