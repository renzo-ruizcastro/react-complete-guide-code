import React, { useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const formReducer = (state, action) => {
  const type = action.type;
  switch (type) {
    case 'EMAIL_CHANGE':
      return {
        ...state,
        email: { value: action.value, isValid: action.value.includes('@') },
      };
    case 'EMAIL_BLUR':
      return {
        ...state,
        email: { ...state.email, isValid: state.email.value.includes('@') },
      };
    case 'PASSWORD_CHANGE':
      return {
        ...state,
        password: {
          value: action.value,
          isValid: action.value.trim().length > 6,
        },
      };
    case 'PASSWORD_BLUR':
      return {
        ...state,
        password: {
          ...state.password,
          isValid: state.email.value.trim().length > 6,
        },
      };
    case 'FORM_VALIDITY':
      return {
        ...state,
        isValid: state.email.isValid && state.password.isValid,
      };
    default:
      return state;
  }
};

const Login = props => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    email: {
      value: '',
      isValid: null,
    },
    password: {
      value: '',
      isValid: null,
    },
    isValid: false,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Checking form validity!');
      dispatchForm({ type: 'FORM_VALIDITY' });
    }, 500);
    return () => {
      console.log('CLEANUP');
      clearTimeout(timer);
    };
  }, [formState.email.isValid, formState.password.isValid]);

  const emailChangeHandler = event => {
    dispatchForm({ type: 'EMAIL_CHANGE', value: event.target.value });
  };

  const passwordChangeHandler = event => {
    dispatchForm({ type: 'PASSWORD_CHANGE', value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();
    if (formState.isValid) {
      authCtx.onLogin(formState.email.value, formState.password.value);
    } else if (!formState.email.isValid) {
      // Function components cannot be given refs
      // useImperativeHandle in input allows this access to the input's function (or value)
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={formState.email.isValid}
          value={formState.email.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={formState.password.isValid}
          value={formState.password.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
