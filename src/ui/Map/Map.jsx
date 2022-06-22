import React, { useRef, useEffect } from "react";

import classes from "./Map.module.css";
export default function Map(props) {
  const mapRef = useRef();
  const { zoom, center } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({
      position: center,
      map: map,
    });
  }, [center, zoom]);

  return <div className={classes.map} ref={mapRef}></div>;
}
