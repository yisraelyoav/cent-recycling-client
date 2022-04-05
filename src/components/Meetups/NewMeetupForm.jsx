import { React, useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
export default function NewMeetupForm() {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHndler(event) {
    event.preventDefault();
    const enterdTitle = titleInputRef.current.value;
    const enterdImage = imageInputRef.current.value;
    const enterdAddress = addressInputRef.current.value;
    const enterdDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enterdTitle,
      image: enterdImage,
      address: enterdAddress,
      description: enterdDescription,
    };
    console.log(meetupData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHndler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Descripttion</label>
          <textarea
            id="description"
            required
            row="5"
            ref={descriptionInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Add Meeetup</button>
        </div>
      </form>
    </Card>
  );
}
