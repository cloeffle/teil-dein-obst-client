import React from 'react'
import Logo from "../assets/logo/Logo.svg";

export default function LogoComponent() {
  return (
    <div className="logo-wrapper">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
}
