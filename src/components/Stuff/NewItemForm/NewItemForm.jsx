import { React, useRef } from "react";
import ImageUploader from "../../../ui/ImageUploader/ImageUploader";
import Card from "../../../ui/Card/Card";
import classes from "./NewItemForm.module.css";
export default function NewItemForm(props) {
  const titleInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  let enteredImage = null;
  const addNewImageHandler = (id, image, imageIsValid) => {
    enteredImage = {
      id: id,
      image: image,
      imageIsValid: imageIsValid,
    };
    return enteredImage;
  };

  function submitHndler(event) {
    event.preventDefault();
    const enterdTitle = titleInputRef.current.value;
    const enterdAddress = addressInputRef.current.value;
    const enterdDescription = descriptionInputRef.current.value;

    const itemData = {
      title: enterdTitle,
      imageObj: enteredImage,
      address: enterdAddress,
      description: enterdDescription,
    };

    props.onAddItem(itemData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHndler}>
        <div className={classes.control}>
          <label htmlFor="title">What do you want to giveaway?</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <ImageUploader id="image" onAddImage={addNewImageHandler} />
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" row="5" ref={descriptionInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Let's recycle</button>
        </div>
      </form>
    </Card>
  );
}
