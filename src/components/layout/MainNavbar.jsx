import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./MainNavbar.module.css";
import { AuthContext } from "../../context/AuthContext";

export default function MainNavbar(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
  }, []);
  return (
    <nav className={classes.mainNav} onClick={props.onClick}>
      {(props.toggleNavbar || screenWidth >= 609) && (
        <CSSTransition
          in={props.toggleNavbar || screenWidth >= 609}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames="modal"
        >
          <ul>
            <li>
              <Link to="/">Random Stuff</Link>
            </li>
            {!auth.isLLoggedIn && (
              <li>
                <Link to="/auth">Log-In</Link>
              </li>
            )}
            {auth.isLLoggedIn && (
              <Fragment>
                <li>
                  <Link to="/my-stuff">My Stuff</Link>
                </li>
                <li>
                  <Link to="/new-item">Add New Item</Link>
                </li>
              </Fragment>
            )}
          </ul>
        </CSSTransition>
      )}
    </nav>
  );
}
