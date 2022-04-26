import React from "react";
import Card from "../ui/Card";
import classes from "./StuffItem.module.css";
export default function StuffItem(props) {
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
          <div>
            <p>{props.description}</p>
          </div>
          <div>{props.address}</div>
        </div>
        <div className={classes.actions}>
          <button>Add to fav</button>
        </div>
      </Card>
    </li>
  );
}
