import React from "react";
import classes from "./StuffDetails.module.css";
export default function StuffDetails(props) {
  return (
    <div>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <h3>owner name</h3>
      <p>{props.description}</p>
      <h3>cel: 0504809992</h3>
      <div>MAP</div>
    </div>
  );
}
