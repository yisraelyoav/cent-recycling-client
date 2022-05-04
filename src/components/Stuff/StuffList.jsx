import React from "react";
import StuffItem from "./StuffItem";
import classes from "./StuffList.module.css";
export default function StuffList(props) {
  return (
    <ul className={classes.list}>
      {props.items.map((Item) => (
        <StuffItem
          key={Item.id}
          id={Item.id}
          title={Item.title}
          image={Item.image}
          address={Item.address}
          description={Item.description}
        />
      ))}
    </ul>
  );
}
