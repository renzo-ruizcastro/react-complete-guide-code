import { useState } from "react";

const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const inputChangeHandler = event => {
        setValue(event.target.value);
    }
    const inputBlurHandler = () => {
        setIsTouched(true);
    }
    const reset = () => {
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;
