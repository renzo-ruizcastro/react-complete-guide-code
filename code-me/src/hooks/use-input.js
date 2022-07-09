import { useState, useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
      };
    case 'BLUR':
      // return { value: state.value, isTouched: true };
      return { ...state, isTouched: true };
    case 'RESET':
      return initialInputState;
    default:
      return initialInputState;
  }
};

const useInput = validateValue => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  // const [value, setValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = event => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
    });
  };
  const inputBlurHandler = () => {
    dispatch({
      type: 'BLUR',
    });
  };
  const reset = () => {
    dispatch({
      type: 'RESET',
    });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
