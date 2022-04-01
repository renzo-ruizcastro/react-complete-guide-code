import React, {
  // useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';

// const emailReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.value, isValid: action.value.includes('@') };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.includes('@') };
//   }
//   return { value: '', isValid: false };
// };

// const passwordReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.value, isValid: action.value.trim().length > 6 };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: '', isValid: false };
// };

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
  // const [formIsValid, setFormIsValid] = useState(false);

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

  useEffect(() => {
    console.log('EFFECT RUNNING');
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Checking form validity!');
      // setFormIsValid(emailState.isValid && passwordState.isValid);
      dispatchForm({ type: 'FORM_VALIDITY' });
    }, 500);
    return () => {
      console.log('CLEANUP');
      clearTimeout(timer);
    };
  }, [formState.email.isValid, formState.password.isValid]);

  const emailChangeHandler = event => {
    // dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
    dispatchForm({ type: 'EMAIL_CHANGE', value: event.target.value });
  };

  const passwordChangeHandler = event => {
    // dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
    dispatchForm({ type: 'PASSWORD_CHANGE', value: event.target.value });
  };

  const validateEmailHandler = () => {
    // dispatchEmail({ type: 'INPUT_BLUR' });
    dispatchForm({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    // dispatchPassword({ type: 'INPUT_BLUR' });
    dispatchForm({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = event => {
    event.preventDefault();
    authCtx.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
