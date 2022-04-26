import React from "react";
import NewItemForm from "../components/Stuff/NewItemForm";

export default function NewItemPage() {
  function addNewMeetupHandler(meetupData) {
    console.log(meetupData);
  }
  return (
    <div>
      <h2>New Item</h2>
      <NewItemForm onAddMeetup={addNewMeetupHandler} />
    </div>
  );
}
