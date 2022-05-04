import { React, useRef, useState, useEffect } from "react";
import classes from "./ImageUploader.module.css";

export default function ImageUploader(props) {
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedImage;
    let imageIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
      setIsValid(true);
      imageIsValid = true;
    } else {
      setIsValid(false);
      imageIsValid = false;
    }
    props.onAddImage(props.id, pickedImage, imageIsValid);
  };

  return (
    <div className={classes.control}>
      <label htmlFor="image">Item Image</label>
      <input
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={classes.image_upload}>
        <div className={classes.image_upload__preview}>
          {imagePreview && <img src={imagePreview} alt="preview" />}
          {!imagePreview && <p>Please pick an image</p>}
        </div>
      </div>
      {!isValid && <p>The image is not valid</p>}
      <div className={classes.buttons}>
        <div className={classes.actions}>
          <button type="button" onClick={pickImageHandler}>
            Pick Image
          </button>
        </div>
        <div className={classes.actions}>
          <button>Upload</button>
        </div>
      </div>
    </div>
  );
}
