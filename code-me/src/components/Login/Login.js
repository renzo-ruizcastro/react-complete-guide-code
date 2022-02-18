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

  useEffect(
    () => {
      // save code, one place
      // validation is still a side effect
      // whenever you have an action that should be executed in response to another action could be considered as a side effect
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    },
    // add as dependencies the variables you use in the effect function that aren't only scoped to it
    // state updating functions are ensured by React to never change, so you can prescinde of them
    [enteredEmail, enteredPassword]
  );

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
