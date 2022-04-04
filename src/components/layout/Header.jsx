import { React, useState } from "react";
import ToggleButton from "../ui/ToggleButton";
import clasess from "./Header.module.css";
import MainNavbar from "./MainNavbar";

export default function Header() {
  const [toggleNavbar, settoggleNavbar] = useState(false);
  function MainNavHandler() {
    settoggleNavbar(!toggleNavbar);
  }
  return (
    <header className={clasess.header}>
      <div className={clasess.logo}>Meetups</div>
      <MainNavbar toggleNavbar={toggleNavbar} />
      <ToggleButton onClick={MainNavHandler} />
    </header>
  );
}
