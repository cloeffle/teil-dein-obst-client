import React from "react";
// import { NavLink } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import ProfilIcon from "../assets/images/Profil-Icon.png";

import "../assets/styles/navbar.css";

export default function Navbar() {
  return (
    <>
      <Menu>
        <a href="/profil" className="menu-item">
          <div className="nav-icons">
            <img src={ProfilIcon} alt="Profil-Button" />
            <span>Mein Profil</span>
          </div>
        </a>
        <a href="/" id="map" className="menu-item">
          <div className="nav-icons">
            <img
              src="https://img.icons8.com/bubbles/100/000000/map-marker.png"
              alt="Karte-Icon"
            />
            <span>Karte</span>
          </div>
        </a>
        <a href="/ueber-teil-dein-obst" id="about" className="menu-item">
          <div className="nav-icons">
            <img
              src="https://img.icons8.com/bubbles/100/000000/about.png"
              alt="Info-Icon"
            />
            <span>Über Teil dein Obst</span>
          </div>
        </a>
        <a href="/kontakt" id="contact" className="menu-item">
          <div className="nav-icons">
            <img
              src="https://img.icons8.com/bubbles/100/000000/email--v1.png"
              alt="Kontakt-Icon"
            />
            <span>Kontakt</span>
          </div>
        </a>
      </Menu>
    </>
  );
}
