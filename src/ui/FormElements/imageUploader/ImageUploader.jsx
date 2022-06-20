// import { React, useRef, useState, useEffect } from "react";
import classes from "./ImageUploader.module.css";

// export default function ImageUploader(props) {
//   const [image, setImage] = useState();
//   const [imagePreview, setImagePreview] = useState();
//   const [isValid, setIsValid] = useState(false);

//   const filePickerRef = useRef();

//   useEffect(() => {
//     if (!image) {
//       return;
//     }
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       setImagePreview(fileReader.result);
//     };
//     fileReader.readAsDataURL(image);
//   }, [image]);

//   const pickImageHandler = () => {
//     filePickerRef.current.click();
//   };

//   const pickedHandler = (event) => {
//     let pickedImage;
//     let imageIsValid = isValid;
//     if (event.target.files && event.target.files.length === 1) {
//       pickedImage = event.target.files[0];
//       setImage(pickedImage);
//       setIsValid(true);
//       imageIsValid = true;
//     } else {
//       setIsValid(false);
//       imageIsValid = false;
//     }
//     props.onInput(props.id, pickedImage, imageIsValid);
//   };

//   return (
//     <div className={classes.control}>
//       <label htmlFor="image">Lottery Image</label>
//       <input
//         id={props.id}
//         style={{ display: "none" }}
//         type="file"
//         accept=".jpg,.png,.jpeg"
//         ref={filePickerRef}
//         onChange={pickedHandler}
//       />
//       <div className={classes.image_upload}>
//         <div className={classes.image_upload__preview}>
//           {imagePreview && <img src={imagePreview} alt="preview" />}
//           {!imagePreview && <p>Please pick an image</p>}
//         </div>
//       </div>
//       {!isValid && <p>The image is not valid</p>}
//       <div className={classes.buttons}>
//         <div className={classes.actions}>
//           <button type="button" onClick={pickImageHandler}>
//             Pick Image
//           </button>
//         </div>
//         <div className={classes.actions}>
//           <button>Upload</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={classes.control}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={classes.image_upload}>
        <div className={classes.image_upload__preview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
      </div>
      <div className={`${classes.actions} ${classes.center}`}>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
