import React from "react";
// import { NavLink } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";

import "../assets/styles/navbar.css";

export default function Navbar() {
  return (
    <>
      <Menu>
        <a href="/profil">
          <i className="fa-solid fa-user"></i>
          <span>Mein Profil</span>
        </a>
        <a href="/" id="map" className="menu-item">
          <i className="fa-solid fa-location-dot"></i>
          <span>Karte</span>
        </a>
        <a href="/ueber-teil-dein-obst" id="about" className="menu-item">
          <i className="fa-solid fa-circle-info"></i>
          <span>Über Teil dein Obst</span>
        </a>
        <a href="/kontakt" id="contact" className="menu-item">
          <i className="fa-solid fa-paper-plane"></i>
          <span>Kontakt</span>
        </a>
      </Menu>
    </>
  );
}
