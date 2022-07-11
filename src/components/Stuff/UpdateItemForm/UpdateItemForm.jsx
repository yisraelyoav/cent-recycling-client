import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./UpdateItemForm.module.css";

import { useForm } from "../../../hooks/form-hook";
import { useHttpRequest } from "../../../hooks/http-hook";
import Card from "../../../ui/Card/Card";
import ErrorModal from "../../../ui/ErrorModal/ErrorModal";
import Input from "../../../ui/FormElements/input/Input";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";
import Loader from "../../../ui/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../utils/validators";

export default function UpdateItemForm() {
  const [formState, inputHandler, setFormData] = useForm();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const [loadedItem, setLoadedItem] = useState();
  const auth = useContext(AuthContext);
  const itemID = useParams().itemID;

  useEffect(() => {
    const getItemByID = async () => {
      const resData = await sendRequest(
        `http://localhost:5000/api/items/${itemID}`,
        "GET",
        null,
        {
          authorization: "Bearer " + auth.token,
        }
      );
      console.log(resData);
      setLoadedItem(resData);
    };

    try {
      getItemByID();
    } catch (err) {}
  }, [sendRequest, auth.token, itemID]);

  const submitUpdateItemHandler = (event) => {
    event.preventDefault();

    // sendRequest(
    //   `http://localhost:5000/api/items/${}`,
    //   "PATCH",
    //   {},
    //   {
    //     authorization: "Bearer " + auth.token,
    //   }
    // );
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <Card>
        <form onSubmit={submitUpdateItemHandler} className={classes.center}>
          <Input
            id="title"
            element="input"
            type="text"
            lable="What do you want to giveaway?"
            value=""
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
            value=""
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Address is required."
          ></Input>
          <Input
            id="description"
            element="textArea"
            lable="Description"
            value=""
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
