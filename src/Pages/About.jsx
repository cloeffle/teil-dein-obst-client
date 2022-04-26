import React from "react";

import "../assets/styles/about.css";
import Logo from "../assets/logo/Logo.svg";

export default function About() {
  return (
    <>
      <div className="logo-wrapper">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <div className="about-container">
        <div className="about-text">
          <h3>Über Teil dein Obst</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid.
          </p>
        </div>
      </div>
    </>
  );
}
