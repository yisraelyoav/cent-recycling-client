import React from "react";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupsList.module.css";
export default function MeetupsList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((Meetup) => (
        <MeetupItem
          key={Meetup.id}
          id={Meetup.id}
          title={Meetup.title}
          image={Meetup.image}
          address={Meetup.address}
          description={Meetup.description}
        />
      ))}
    </ul>
  );
}
