import React, { useState } from "react";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import LogoComponent from "../components/LogoComponent";
import "../assets/styles/treeRegistration.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const fruits = [
  "Apfel",
  "Aprikose",
  "Birne",
  "Erdbeere",
  "Heidelbeere",
  "Himbeere",
  "Johannisbeere",
  "Kirsche",
  "Stachelbeere",
  "Weintraube",
  "Pflaume",
  "Sonstiges",
];

function getStyles(fruit, fruitName, theme) {
  return {
    fontWeight:
      fruitName.indexOf(fruit) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,

    color: fruitName.indexOf(fruit) === -1 ? "#444" : "white",

    backgroundColor: fruitName.indexOf(fruit) === -1 ? "white" : "#5a9481",
    fontFamily: fruitName.indexOf(fruit) === -1 ? "Nunito" : "Nunito",
  };
}

export default function TreeRegistration() {
  const toDay = new Date().toISOString().substring(0, 10);
  const theme = useTheme();
  const [fruitName, setFruitName] = useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setFruitName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <div>
        <LogoComponent />
        <div className="tree-form-container">
          <form className="tree-form">
            <h3>Obstbaum zur Verfügung stellen</h3>
            <FormControl sx={{ m: 1, width: 320 }}>
              <InputLabel id="Obstsorte" sx={{ fontFamily: "Nunito" }}>
                Obstsorte
              </InputLabel>
              <Select
                labelId="Obstsorte"
                id="Obstsorte"
                multiple
                value={fruitName}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-obstsorte" label="Obstsorte" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        sx={{
                          backgroundColor: "#5a9481",
                          color: "white",
                          fontFamily: "Nunito",
                        }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              required>
                {fruits.map((fruit) => (
                  <MenuItem
                    key={fruit}
                    value={fruit}
                    style={getStyles(fruit, fruitName, theme)}
                  >
                    {fruit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label>Standort</label>
            <input
              className="tree-input-field"
              type="text"
              name="strasse"
              placeholder="Straße, Hausnummer"
              required
            />
            <input
              className="tree-input-field"
              type="number"
              name="plz"
              placeholder="Postleitzahl"
              required
            />
            <input
              className="tree-input-field"
              type="text"
              name="stadt"
              placeholder="Ort"
              required
            />
            <label>Erntezeitraum</label>
            <p>von</p>
            <input
              className="tree-input-field"
              type="date"
              name="start"
              defaultValue={toDay}
            />
            <p>bis</p>
            <input className="tree-input-field" type="date" name="end" />
            <label>Infos</label>
            <textarea
              className="tree-input-field"
              name="message"
              cols="30"
              rows="5"
              placeholder="Nähere Informationen zum Standort, der Zugänglickeit z.B. Pflücken nur nach Absprache möglich etc."
            ></textarea>
            <input type="file" />
            <input type="submit" className="submit btn" value="Hinzufügen" />
          </form>
        </div>
      </div>
    </>
  );
}
