import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavbar.module.css";
export default function MainNavbar(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);
  return (
    <nav className={classes.mainNav}>
      {(props.toggleNavbar || screenWidth > 680) && (
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/new-Meetup">Add New Meetup</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
