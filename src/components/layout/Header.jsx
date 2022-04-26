import { React, useState } from "react";
import ToggleButton from "../ui/ToggleButton";
import clasess from "./Header.module.css";
import MainNavbar from "./MainNavbar";

export default function Header() {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  function MainNavHandler() {
    setToggleNavbar(!toggleNavbar);
  }
  return (
    <header className={clasess.header}>
      <div className={clasess.logo}>¢ent</div>
      <MainNavbar toggleNavbar={toggleNavbar} />
      <ToggleButton onClick={MainNavHandler} />
    </header>
  );
}
