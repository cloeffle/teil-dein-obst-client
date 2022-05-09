import React from "react";

import "../assets/styles/about.css";
import LogoComponent from "../components/LogoComponent";

export default function About() {
  return (
    <>
      <LogoComponent />
      <div className="about-container">
        <div className="about-text-wrapper">
          <h3>Über Teil dein Obst</h3>
          <div className="about-text">
            <i>Teil dein Obst</i> ist eine Plattform auf der Besitzer von
            Obstbäumen/-sträucher das Obst der Gemeinschaft zur Verfügung
            stellen können bevor es verfault. Besitzer müssen sich vorher
            registrieren um das Obst hochzuladen.
            <br />
            Obstliebhaber können die Map ohne Registrierung nutzen. Wer jedoch eine
            Favoritenliste erstellen möchte um z.B. zu sehen, ob es dort noch Früchte
            gibt, oder die Kommentarfunktion nutzen möchte, muss sich zuerst
            registrieren.
            <br />
            Folgende Regeln sollten bei der Nutzung von <i>Teil dein Obst</i> berücksichtigt
            werden:
            <br />
            <ol>
              <li>
                <b>Nimm nur so viel Obst wie Du selbst essen kannst</b>
              </li>
              <li>
                <b>
                  Veröffentliche keine Obstbäume/-sträucher die Dir nicht
                  gehören
                </b>
              </li>
              <li>
                <b>Gehe behutsam mit dem Eigentum anderer um. Breche keine Äste oder entwurzel Pflanzen etc.</b>
              </li>
              <li>
                <b>Achte auf die Infos vom Besitzer und halte Dich an sie</b>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
