import React, { useState, useRef } from 'react';

import Wrapper from '../Helpers/Wrapper';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
  // Using refs
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();
    console.log(nameInputRef);
    const enteredRefUsername = nameInputRef.current.value;
    const enteredRefAge = ageInputRef.current.value;
    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    //   setError({
    //     title: 'Invalid input',
    //     message: 'Please enter a valid name and age (non-empty values).',
    //   });
    //   return;
    // }
    // if (+enteredAge < 1) {
    //   setError({
    //     title: 'Invalid age',
    //     message: 'Please enter a valid age (> 0).',
    //   });
    //   return;
    // }
    if (
      enteredRefUsername.trim().length === 0 ||
      enteredRefAge.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredRefAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    // props.onAddUser(enteredUsername, enteredAge);
    // setEnteredUsername('');
    // setEnteredAge('');
    props.onAddUser(enteredRefUsername, enteredRefAge);
    // Generally is not a good idea manipulating DOM with refs, but in this case, to clear inputs, it's ok
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  // const usernameChangeHandler = event => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = event => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            // Using refs
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            // Using refs
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
