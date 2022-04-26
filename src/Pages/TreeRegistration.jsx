import React from "react";
import LogoComponent from "../components/LogoComponent";
import "../assets/styles/treeRegistration.css";

export default function TreeRegistration() {
  return (
    <>
      <div>
        <LogoComponent />
        <div className="tree-form-container">
          <form className="tree-form">
            <h3>Obstbaum zur Verfügung stellen</h3>
            <label>Obstsorte</label>
            <input
              className="tree-input-field"
              type="text"
              name="Obstsorte"
              placeholder="Obstsorte"
            />
            <label>Standort</label>
            <input
              className="tree-input-field"
              type="text"
              name="Strasse"
              placeholder="Straße"
            />
            <input
              className="tree-input-field"
              type="number"
              name="Hausnummer"
              placeholder="Hausnummer"
            />
            <input
              className="tree-input-field"
              type="number"
              name="PLZ"
              placeholder="PLZ"
            />
            <input
              className="tree-input-field"
              type="text"
              name="Ort"
              placeholder="Ort"
            />
            <label>Infos</label>
            <textarea
              className="tree-input-field"
              name="message"
              cols="30"
              rows="5"
              placeholder="Nähere Informationen zum Standort und der Zugänglickeit z.B. Pflücken nur nach Absprache möglich"
            ></textarea>
            <input
              type="submit"
              className="submit btn"
              value="Hinzufügen"
            />
          </form>
        </div>
      </div>
    </>
  );
}
