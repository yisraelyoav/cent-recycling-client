import React from "react";
import MeetupsList from "../components/Meetups/MeetupsList";
const DUMMY_DATA = [
  {
    id: "m1",
    title: "arrival to school",
    image:
      "https://t4.ftcdn.net/jpg/01/21/68/83/240_F_121688387_9Qg7qCFJ0hfirILJiVQlIpnUvr0lkLIj.jpg",
    address: "Hogwarts School of Witchcraft and Wizardry,  United Kingdom",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "going out to Hogsmeade",
    image:
      "https://blockwarts.files.wordpress.com/2020/09/f7014231c6f006912157efd2ad4bfd33-1.jpg?w=1024",
    address: "Hogsmeade,  United Kingdom",
    description:
      "This is a second, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];

export default function AllMeetupPage() {
  return (
    <div>
      <h2>All Meetups</h2>
      <MeetupsList meetups={DUMMY_DATA} />
    </div>
  );
}
