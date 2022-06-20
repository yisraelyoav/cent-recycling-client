import React from "react";
import classes from "./ToggleButton.module.css";
export default function ToggleButton(props) {
  return (
    <div className={classes.toggle_button} onClick={props.onClick}>
      <span className={classes.bar} />
      <span className={classes.bar} />
      <span className={classes.bar} />
    </div>
  );
}
