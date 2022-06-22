import React from "react";

import classes from "./NewItemForm.module.css";
import { useForm } from "../../../hooks/form-hook";
import Card from "../../../ui/Card/Card";
import Input from "../../../ui/FormElements/input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../../utils/validators";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";

export default function NewItemForm() {
  const [formState, inputHandler] = useForm(
    {
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
    false
  );

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
          lable="Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Address is required."
        ></Input>
        <Input
          id="description"
          element="textArea"
          lable="Description"
          isValid={true}
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
