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
    <nav className={classes.mainNav} onClick={props.onClick}>
      {(props.toggleNavbar || screenWidth >= 609) && (
        <ul>
          <li>
            <Link to="/">Random Stuff</Link>
          </li>
          <li>
            <Link to="/my-stuff">My Stuff</Link>
          </li>
          <li>
            <Link to="/new-item">Add New Item</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
