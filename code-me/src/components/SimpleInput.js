import { useState, useReducer, useRef, useEffect } from 'react';

const SimpleInput = props => {
  // const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   if (enteredNameIsValid) console.log('Name input is valid!');
  // }, [enteredNameIsValid]);

  // Evaluates in each render cycle
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  let formIsValid = false;

  if (
    enteredNameIsValid
    // && others
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

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
    // State updates as scheduled
    // The line below doesn't have the updated state
    // use the same data source from which the state is updated
    // if (event.target.value.trim() !== '') {
    //   setEnteredNameIsValid(true);
    // }
  };

  const nameInputBlurHandler = event => {
    setEnteredNameIsTouched(true);
    // if (enteredName.trim() === '') {
    //   setEnteredNameIsValid(false);
    // }
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    setEnteredNameIsTouched(true); // When submitted we can argue that the user has touched the input
    // if (enteredName.trim() === '') {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
    // if (!enteredNameIsValid) return;
    if (!formIsValid) return;
    // setEnteredNameIsValid(true);
    console.log(enteredName);
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    // nameInputRef.current.value = ''; // Not optimal, you're playing with the DOM. Leave manipulating to React
    setEnteredName('');
    setEnteredNameIsTouched(false);
  };

  const nameInputClasses = `form-control${
    nameInputIsInvalid ? ' invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
