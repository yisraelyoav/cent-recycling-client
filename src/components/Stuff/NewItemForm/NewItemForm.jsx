import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./NewItemForm.module.css";
import { useForm } from "../../../hooks/form-hook";
import { AuthContext } from "../../../context/AuthContext";
import Card from "../../../ui/Card/Card";
import ErrorModal from "../../../ui/ErrorModal/ErrorModal";
import Loader from "../../../ui/Loader/Loader";
import Input from "../../../ui/FormElements/input/Input";
import { useHttpRequest } from "../../../hooks/http-hook";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../../utils/validators";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";

export default function NewItemForm() {
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const nevigate = useNavigate();
  const auth = useContext(AuthContext);
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
  const submitNewItemHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("description", formState.inputs.description.value);
    console.log(auth.userID);
    formData.append("owner", auth.userID);
    try {
      await sendRequest("http://localhost:5000/api/items/", "POST", formData, {
        authorization: "Bearer " + auth.token,
      });
      nevigate("/");
    } catch (err) {}
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
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
    </Fragment>
  );
}
