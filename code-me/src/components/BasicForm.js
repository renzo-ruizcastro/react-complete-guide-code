import useInput from '../hooks/use-input';

const validateName = value => value.trim() !== '';
const validateEmail = value => value.includes('@');

const BasicForm = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateName);
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(validateName);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid)
    formIsValid = true;

  const formSubmissionHandler = event => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log(enteredName, enteredLastName, enteredEmail);
    resetNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const nameInputClasses = `form-control${nameInputHasError ? ' invalid' : ''}`;
  const lastNameInputClasses = `form-control${
    lastNameInputHasError ? ' invalid' : ''
  }`;
  const emailInputClasses = `form-control${
    emailInputHasError ? ' invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            id="name"
          />
          {nameInputHasError && (
            <p className="error-text">Name must not be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            type="text"
            id="name"
          />
          {lastNameInputHasError && (
            <p className="error-text">Last name must not be empty</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="name">E-Mail Address</label>
          <input
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="text"
            id="name"
          />
          {emailInputHasError && (
            <p className="error-text">E-Mail must contain @</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
