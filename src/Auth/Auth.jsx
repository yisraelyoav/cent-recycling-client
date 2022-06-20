import React, {
  Fragment,
  useCallback,
  useReducer,
  useContext,
  useState,
} from "react";

import { AuthContext } from "../context/AuthContext";
import Input from "../ui/FormElements/input/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../utils/validators";
import classes from "./Auth.module.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export default function Login() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: formData,
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    auth.login();
  };
  const switchModeHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      setFormData({
        fName: {
          value: "",
          isValid: false,
        },
        lName: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        password: {
          value: "",
          isValid: false,
        },
      });
    } else {
      setFormData({
        email: {
          value: "",
          isValid: false,
        },
        password: {
          value: "",
          isValid: false,
        },
      });
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <form className={classes.loginForm} onSubmit={loginSubmitHandler}>
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
          isLoginMode ? "Please enter your email" : "Please enter valid email."
        }
      ></Input>
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
      <button className={classes.switchModeButton} onClick={switchModeHandler}>
        {isLoginMode ? " Create New User" : "Switch to login"}
      </button>
    </form>
  );
}
