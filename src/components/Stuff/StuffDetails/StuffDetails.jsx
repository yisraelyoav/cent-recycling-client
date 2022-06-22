import React from "react";
import classes from "./StuffDetails.module.css";
import Map from "../../../ui/Map/Map";
export default function StuffDetails(props) {
  return (
    <div>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <h4>owner name</h4>
      <p>{props.description}</p>
      <h4>cel: 0504809992</h4>
      <Map center={props.location} zoom={16} />
    </div>
  );
}
