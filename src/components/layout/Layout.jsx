import React from "react";
import classes from "./Layout.module.css";
import Header from "./Header";
export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className={classes.main}>{props.children}</div>
    </div>
  );
}
