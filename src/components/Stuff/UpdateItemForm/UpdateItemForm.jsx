import React, { useContext } from "react";

import classes from "./UpdateItemForm.module.css";

import { useForm } from "../../../hooks/form-hook";
import { useHttpRequest } from "../../../hooks/http-hook";
import Card from "../../../ui/Card/Card";
import Input from "../../../ui/FormElements/input/Input";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";
import { AuthContext } from "../../../context/AuthContext";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";
import { useEffect } from "react";

export default function UpdateItemForm(props) {
  const { item } = props;
  const [formState, inputHandler, setFormData] = useForm(
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
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const auth = useContext(AuthContext);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: item.title,
          isValid: true,
        },
        image: {
          value: item.image,
          isValid: true,
        },
        address: {
          value: item.address,
          isValid: true,
        },
        description: {
          value: item.description,
          isValid: true,
        },
      },
      true
    );
  }, [item, setFormData]);

  const submitUpdateItemHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // sendRequest(
    //   `http://localhost:5000/api/items/`,
    //   "PATCH",
    //   {},
    //   {
    //     authorization: "Bearer " + auth.token,
    //   }
    // );
  };
  return (
    <Card>
      <form onSubmit={submitUpdateItemHandler} className={classes.center}>
        <Input
          id="title"
          element="input"
          type="text"
          lable="What do you want to giveaway?"
          value={item.title}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Title is required."
        ></Input>
        <ImageUploader
          id="image"
          onInput={inputHandler}
          initialImage={item.image}
        ></ImageUploader>
        <Input
          id="address"
          element="input"
          type="text"
          lable="Address"
          value={item.address}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Address is required."
        ></Input>
        <Input
          id="description"
          element="textArea"
          lable="Description"
          value={item.description}
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
