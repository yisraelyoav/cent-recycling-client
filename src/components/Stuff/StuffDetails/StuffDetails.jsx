import React from "react";
import classes from "./StuffDetails.module.css";
import Map from "../../../ui/Map/Map";
export default function StuffDetails(props) {
  return (
    <div>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <p>{props.description}</p>
      <div className={classes.ownerDetails}>
        <h4 className={classes.ownerName}>owner name</h4>
        <h4>cel: 0504809992</h4>
      </div>
      <h4>{props.address}</h4>
      <Map center={props.location} zoom={16} />
    </div>
  );
}
