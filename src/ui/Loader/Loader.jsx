import React from "react";

import classes from "./Loader.module.css";
export default function Loader(props) {
  return (
    <div className={`${props.asOverlay && classes.loadingSpinnerOverlay}`}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
}
