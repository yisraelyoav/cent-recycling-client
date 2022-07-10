import { React, useState, useContext } from "react";
import ReactDOM from "react-dom";

import ToggleButton from "../../ui/ToggleButton/ToggleButton";
import clasess from "./Header.module.css";
import MainNavbar from "./MainNavbar";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const auth = useContext(AuthContext);

  function MainNavHandler() {
    setToggleNavbar(!toggleNavbar);
  }
  const content = (
    <header className={clasess.header}>
      <div className={clasess.headerHead}>
        <div className={clasess.logo}>¢ent</div>
        {auth.token && <h4>{`Hello ${auth.fName}`}</h4>}
        <ToggleButton onClick={MainNavHandler} />
      </div>
      <MainNavbar toggleNavbar={toggleNavbar} onClick={MainNavHandler} />
    </header>
  );

  return ReactDOM.createPortal(content, document.getElementById("header-hook"));
}
