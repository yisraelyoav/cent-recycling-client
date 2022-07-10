import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../ui/Loader/Loader";
import { useForm } from "../hooks/form-hook";
import Input from "../ui/FormElements/input/Input";
import { useHttpRequest } from "../hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_PHONE,
} from "../utils/validators";
import classes from "./Auth.module.css";
import ErrorModal from "../ui/ErrorModal/ErrorModal";

export default function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = (event) => {
    event.preventDefault();

    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          fName: undefined,
          lName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          fName: {
            value: "",
            isValid: false,
          },
          lName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const res = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(res.userID, res.token, res.fName);
      } catch (err) {}
    } else {
      try {
        const res = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            fName: formState.inputs.fName.value,
            lName: formState.inputs.lName.value,
            email: formState.inputs.email.value,
            phone: formState.inputs.phone.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(res.userID, res.token);
      } catch (error) {}
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className={classes.loginForm} onSubmit={loginSubmitHandler}>
        {isLoading && <Loader asOverlay />}
        <h1> {isLoginMode ? "Login" : "Sign-Up"}</h1>
        <hr />
        {!isLoginMode && (
          <Fragment>
            <Input
              id="fName"
              element="input"
              type="text"
              lable="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="First name is required."
            ></Input>
            <Input
              id="lName"
              element="input"
              type="text"
              lable="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Last name is required."
            ></Input>
            <Input
              id="phone"
              element="input"
              type="text"
              lable="phone"
              validators={[VALIDATOR_PHONE()]}
              onInput={inputHandler}
              errorText="Phone/cellphone is required."
            ></Input>
          </Fragment>
        )}
        <Input
          id="email"
          element="input"
          type="email"
          lable="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText={
            isLoginMode
              ? "Please enter your email"
              : "Please enter valid email."
          }
        >
          <i class="material-symbols-outlined">visibility</i>
        </Input>
        <Input
          id="password"
          element="input"
          type="password"
          lable="Password"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText={
            isLoginMode ? "Please enter your password." : "Min 6 characters"
          }
        ></Input>
        <div className={classes.actions}>
          <button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Sign-Up"}
          </button>
        </div>
        <button
          className={classes.switchModeButton}
          onClick={switchModeHandler}
        >
          {isLoginMode ? " Create New User" : "Switch to login"}
        </button>
      </form>
    </Fragment>
  );
}
