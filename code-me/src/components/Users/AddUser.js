import { useState } from 'react';
import styles from './AddUser.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState(); // starting with a falsy value

  const addUserHandler = event => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Empty fields',
        message: 'Please enter a valid username and age',
      });
      return;
    }
    // regex for username
    const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
    if (!usernameRegex.test(enteredUsername)) {
      setError({
        title: 'Invalid username',
        message:
          'Your username must have between 3 and 16 characters, you can use lower and upper case letters, decimal numbers and -, _, .',
      });
      return;
    }

    if (!Number.isInteger(+enteredAge) || +enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Age must be an integer and greater than 0',
      });
      return;
    }
    console.log(enteredUsername, enteredAge);
    props.onAddUser({
      id: Math.random().toString(),
      username: enteredUsername,
      age: +enteredAge,
    });
    // For make this work you must use two way binding (value)
    setEnteredUsername('');
    setEnteredAge('');
  };
  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = event => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            onChange={usernameChangeHandler}
            type="text"
            value={enteredUsername}
            id="username"
            name="username"
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            onChange={ageChangeHandler}
            type="number"
            value={enteredAge}
            id="age"
            name="age"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
