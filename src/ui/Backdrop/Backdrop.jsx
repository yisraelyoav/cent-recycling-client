import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";
export default function Backdrop(props) {
  const content = (
    <div className={classes.backdrop} onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
}
