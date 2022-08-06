import styles from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const validateName = value => {
  return value.trim().match(/^[a-zA-Z\s]+$/);
};

const validatePostalCode = value => {
  return value.match(/^[0-9]{5}$/);
};

const Checkout = props => {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(validateName);

  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(validateName);

  const {
    value: postal,
    isValid: postalIsValid,
    hasError: postalHasError,
    inputChangeHandler: postalInputChangeHandler,
    inputBlurHandler: postalInputBlurHandler,
  } = useInput(validatePostalCode);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(validateName);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid)
    formIsValid = true;

  const confirmHandler = e => {
    e.preventDefault();
    if (!formIsValid) return;
    props.onConfirm({
      name,
      street,
      postal,
      city,
    });
  };

  const nameControlClasses = `${styles.control} ${
    nameHasError ? styles.invalid : ''
  }`;
  const streetControlClasses = `${styles.control} ${
    streetHasError ? styles.invalid : ''
  }`;
  const postalControlClasses = `${styles.control} ${
    postalHasError ? styles.invalid : ''
  }`;
  const cityControlClasses = `${styles.control} ${
    cityHasError ? styles.invalid : ''
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
        />
        {postalHasError && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
