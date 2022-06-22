import { React, useCallback, useReducer } from "react";

import classes from "./NewItemForm.module.css";
import Card from "../../../ui/Card/Card";
import Input from "../../../ui/FormElements/input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../../utils/validators";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";

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

export default function NewItemForm() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
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

  function submitNewItemHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }
  return (
    <Card>
      <form onSubmit={submitNewItemHandler} className={classes.center}>
        <Input
          id="title"
          element="input"
          type="text"
          lable="What do you want to giveaway?"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Title is required."
        ></Input>
        <ImageUploader id="image" onInput={inputHandler}></ImageUploader>
        <Input
          id="address"
          element="input"
          type="text"
          lable="Address?"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Address is required."
        ></Input>
        <Input
          id="description"
          element="textArea"
          lable="Description?"
          onInput={inputHandler}
          validators={[VALIDATOR_MAXLENGTH(200)]}
          errorText="Not allowed more than 200 characters."
        ></Input>
        <div className={`${classes.actions} ${classes.center}`}>
          <button type="submit" disabled={!formState.isValid}>
            Let's recycle ♻
          </button>
        </div>
      </form>
    </Card>
  );
}
