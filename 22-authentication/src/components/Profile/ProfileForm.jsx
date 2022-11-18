import { useRef, useContext, useEffect } from 'react';
import classes from './ProfileForm.module.css';
import { useFetch } from '../../hooks';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const API_CHANGE_PASSWORD = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const ProfileForm = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef();
  const { sendRequest, isLoading, error, data } = useFetch();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (data) {
      alert('Password changed!');
      navigate('/');
    }
  });

  const submitHandler = async event => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // TODO: add validation...

    const body = {
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: true,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await sendRequest(API_CHANGE_PASSWORD, options);
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPasswordInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        {!isLoading ? (
          <button onClick={submitHandler}>Change Password</button>
        ) : (
          <p>Sending request...</p>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
