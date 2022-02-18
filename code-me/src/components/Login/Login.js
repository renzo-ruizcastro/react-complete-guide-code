import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = props => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    // With setTimeout we are not running the function immediately, but after a delay
    const timer = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);
    // Until here we're only delaying the input validation in each keystroke
    // Our goal is to validate the input only when the user has stopped typing. (debouncing) In other words when there's been at least 500ms of inactivity
    // This involves completing the timeout function only in these cases

    // ANSWER: return a cleanup function
    // Works as a cleanup process before useEffect runs again
    // Whenever the effect function runs, except the first time (component mounted), BEFORE it runs, the cleanup function will run
    // Also runs (before) whenever the component that stores the useEffect hook is unmounted from the DOM
    // not necessarily an anonymous function
    return () => {
      console.log('CLEANUP');
      // We clear the timer before a new useEffect execution
      clearTimeout(timer);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
    /*
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
    */
  };

  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value);
    /*
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
    */
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
