import React from "react";

import classes from "./ErrorModal.module.css";
import Modal from "../Modal/Modal";
export default function ErrorModal(props) {
  return (
    <Modal
      onCancel={props.onClear}
      header="Error"
      show={props.error}
      footer={
        <div className={classes.actions}>
          <button onClick={props.onClear}>Okay</button>
        </div>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
}
