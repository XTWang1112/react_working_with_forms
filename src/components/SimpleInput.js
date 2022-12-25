import {useState} from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlur: nameBlur,
    reset: resteNameInput,
  } = useInput((value) => value.trim() !== "");
  // const nameInputRef = useRef();
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlur: emailBlur,
    reset: resteEmailInput,
  } = useInput((value) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.trim().match(validRegex) && value.trim() !== "";
  });
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    resteNameInput();
    resteEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          type="text"
          id="name"
          onBlur={nameBlur}
          onChange={nameChangedHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onBlur={emailBlur}
          onChange={emailChangedHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Email is not valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
