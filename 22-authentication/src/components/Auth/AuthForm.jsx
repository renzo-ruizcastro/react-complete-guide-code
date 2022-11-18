import { useState, useRef, useContext, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import { useFetch } from '../../hooks';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const API_SINGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const API_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const AuthForm = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const { sendRequest, data, error, isLoading } = useFetch();

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (data) {
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate('/', {
        replace: true,
      });
    }
  }, [error, data]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = async event => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    const url = isLogin ? API_SINGIN : API_SIGNUP;
    const body = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await sendRequest(url, options);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          ) : (
            <p>Sending request...</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
