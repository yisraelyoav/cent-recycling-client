import React, { Fragment } from "react";
import NewItemForm from "../components/Stuff/NewItemForm/NewItemForm";

export default function NewItemPage() {
  return (
    <Fragment>
      <h2>Add Item</h2>
      <NewItemForm />
    </Fragment>
  );
}
