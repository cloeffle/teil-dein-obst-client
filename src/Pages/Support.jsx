import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import "../Assets/styles/support.css";
import Logo from "../Assets/logo/Logo.svg";

export default function Support() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  let navigate = useNavigate();
  function goBack() {
    navigate("/");
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className="supportWrapper">
        <div className="toMap">
          <button className="toMap-btn" onClick={goBack}>
            zurück
          </button>
        </div>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="support-container">
          <form ref={form} onSubmit={sendEmail} className="support-form">
            <h3>Kontaktformular</h3>
            <div className="support-content">
              Du hast Fragen, Anregungen oder Dein Obstbaum wurde
              fälschlicherweise hier hochgeladen?
              <br />
              Dann kontaktiere uns gerne über dieses Kontaktformular. Wir werden
              uns schnellstmöglich mit Dir in Verbindung setzen!
            </div>
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              className="support-name"
              placeholder="Gebe hier Deinen Namen ein"
              required
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
            />
            <label>E-Mail Adresse</label>
            <input
              type="email"
              name="user_email"
              className="support-mail"
              placeholder="Gebe hier Deine E-Mail Adresse ein"
              required
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
            <label>Deine Nachricht an uns</label>
            <textarea
              className="support-message"
              name="message"
              cols="30"
              rows="8"
              placeholder="Deine Nachricht..."
              required
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
            ></textarea>
            <button
              className="support-submit"
              type="submit"
              value="ABSCHICKEN"
              disabled={!userInput}
            >
              ABSCHICKEN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
