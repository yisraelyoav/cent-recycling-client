import React from "react";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
export default function MeetupItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <div>{props.address}</div>
          <div>
            <p>{props.description}</p>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Add to fav</button>
        </div>
      </Card>
    </li>
  );
}
