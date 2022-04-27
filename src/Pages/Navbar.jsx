import React from "react";
import { NavLink } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";

import "../assets/styles/navbar.css";

export default function Navbar() {
  return (
    <>
      <Menu noOverlay>
        <NavLink to="/profil">Mein Profil</NavLink>
        <NavLink to="/" id="map" className="menu-item">
          Karte
        </NavLink>
        <NavLink to="/ueber-teil-dein-obst" id="about" className="menu-item">
          Über Teil dein Obst
        </NavLink>
        <NavLink
          to="/kontakt"
          id="contact"
          className="menu-item"
          href="/contact"
        >
          Kontakt
        </NavLink>
      </Menu>
    </>
  );
}
