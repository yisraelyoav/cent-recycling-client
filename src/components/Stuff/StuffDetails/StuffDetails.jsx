import React from "react";
import classes from "./StuffDetails.module.css";
import Map from "../../../ui/Map/Map";
export default function StuffDetails(props) {
  const { image, address, location, owner, description, title } = props;

  return (
    <div>
      <div className={classes.image}>
        <img src={`${process.env_production.REACT_APP_BACKEND_URL}${image}`} alt={title} />
      </div>
      <p>{description}</p>
      <div className={classes.ownerDetails}>
        <h4 className={classes.ownerName}>{`${owner.fName} ${owner.lName}`}</h4>
        <h4>{owner.phone}</h4>
      </div>
      <p>{address}</p>
      <Map center={location} zoom={16} />
    </div>
  );
}
