import { React, useState } from "react";
import ReactDOM from "react-dom";

import ToggleButton from "../../ui/ToggleButton/ToggleButton";
import clasess from "./Header.module.css";
import MainNavbar from "./MainNavbar";

export default function Header() {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  function MainNavHandler() {
    setToggleNavbar(!toggleNavbar);
  }

  const content = (
    <header className={clasess.header}>
      <div className={clasess.logo}>¢ent</div>

      <MainNavbar toggleNavbar={toggleNavbar} onClick={MainNavHandler} />
      <ToggleButton onClick={MainNavHandler} />
    </header>
  );

  return ReactDOM.createPortal(content, document.getElementById("header-hook"));
}
