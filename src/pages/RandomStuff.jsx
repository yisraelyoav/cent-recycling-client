import React from "react";
import StuffList from "../components/Stuff/StuffList";
const DUMMY_DATA = [
  {
    id: "m1",
    title: "Tessla",
    image:
      "https://cdn.motor1.com/images/mgl/Q12M1/s1/4x3/2021-tesla-model-s-plaid.webp",
    address: "Desert Sahara,  Eygpt-Morocco",
    description: "Tessla model s",
  },
  {
    id: "m2",
    title: "Marvel Action Figures set",
    image:
      "https://www.toysrus.ca/on/demandware.static/-/Sites-toys-master-catalog/default/dwa1f51edb/images/A442CABB_1.jpg",
    address: "177A Bleecker Street, New York City, NY,  United Kingdom",
    description: "Marvel Titan Hero Series Avengers",
  },
];

export default function RandomStuffPage() {
  return (
    <div>
      <h2>Random Stuff</h2>
      <StuffList meetups={DUMMY_DATA} />
    </div>
  );
}
