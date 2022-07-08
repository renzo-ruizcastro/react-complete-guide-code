import { useState, useReducer, useRef, useEffect } from 'react';
import useInput from '../hooks/use-input';

// const emailRegex;

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');
  // const nameInputRef = useRef();
  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.includes('@'));
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  // const enteredEmailIsValid = enteredEmail.includes('@');
  // const enteredEmailIsValid = emailRegex.test(enteredEmail);
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  // useEffect(() => {
  //   if (enteredNameIsValid) console.log('Name input is valid!');
  // }, [enteredNameIsValid]);

  // Evaluates in each render cycle
  // const enteredNameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    // && others
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     // and other input validity values
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid])

  // const nameInputChangeHandler = event => {
  //   setEnteredName(event.target.value);
  //   // State updates as scheduled
  //   // The line below doesn't have the updated state
  //   // use the same data source from which the state is updated
  //   // if (event.target.value.trim() !== '') {
  //   //   setEnteredNameIsValid(true);
  //   // }
  // };

  // const nameInputBlurHandler = event => {
  //   setEnteredNameIsTouched(true);
  //   // if (enteredName.trim() === '') {
  //   //   setEnteredNameIsValid(false);
  //   // }
  // };

  // const emailInputChangeHandler = event => {
  //   setEnteredEmail(event.target.value);
  // };

  // const emailInputBlurHandler = event => {
  //   setEnteredEmailIsTouched(true);
  // };

  const formSubmissionHandler = event => {
    event.preventDefault();
    // setEnteredNameIsTouched(true); // When submitted we can argue that the user has touched the input

    // setEnteredEmailIsTouched(true);
    // if (enteredName.trim() === '') {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
    // if (!enteredNameIsValid) return;
    if (!formIsValid) return;
    // setEnteredNameIsValid(true);
    console.log(enteredName, enteredEmail);
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    // nameInputRef.current.value = ''; // Not optimal, you're playing with the DOM. Leave manipulating to React
    // setEnteredName('');
    // setEnteredNameIsTouched(false);
    resetNameInput();
    // setEnteredEmail('');
    // setEnteredEmailIsTouched(false);
    resetEmailInput();
  };

  const nameInputClasses = `form-control${nameInputHasError ? ' invalid' : ''}`;

  const emailInputClasses = `form-control${
    emailInputHasError ? ' invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          // onChange={nameInputChangeHandler}
          onChange={nameChangedHandler}
          // onBlur={nameInputBlurHandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          type="text"
          id="email"
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
