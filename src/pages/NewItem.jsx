import React from "react";
import NewItemForm from "../components/Stuff/NewItemForm";

export default function NewItemPage() {
  function addNewItemHandler(itemData) {
    console.log(itemData);
  }
  return (
    <div>
      <h2>New Item</h2>
      <NewItemForm onAddItem={addNewItemHandler} />
    </div>
  );
}
