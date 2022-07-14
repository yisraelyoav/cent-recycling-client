import { React, useState, useContext } from "react";
import ReactDOM from "react-dom";

import ToggleButton from "../../ui/ToggleButton/ToggleButton";
import classes from "./Header.module.css";
import MainNavbar from "./MainNavbar";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const auth = useContext(AuthContext);

  function MainNavHandler() {
    setToggleNavbar(!toggleNavbar);
  }
  const content = (
    <header className={classes.header}>
      <div className={classes.headerHead}>
        <h3 className={classes.logo}>¢ent-</h3>
        <h3>Recycling project</h3>
        {auth.token && (
          <h4 className={classes.userName}>{`Hello ${auth.fName}`}</h4>
        )}
        <ToggleButton onClick={MainNavHandler} />
      </div>
      <MainNavbar toggleNavbar={toggleNavbar} onClick={MainNavHandler} />
    </header>
  );

  return ReactDOM.createPortal(content, document.getElementById("header-hook"));
}
