import React, { useState, useEffect, useCallback } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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

// Select Option Obstsorte
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
  const { user } = useAuth0();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fruitName, setFruitName] = useState([]);

  // Select Fruits Option
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setFruitName(typeof value === "string" ? value.split(",") : value);
    const myFruit = typeof value === "string" ? value.split(",") : value;
    setUserInput({
      ...userInput,
      type: myFruit,
    });
  };

  // Form Input
  const [userInput, setUserInput] = useState({
    type: "",
    lat: "",
    lng: "",
    start: "",
    end: "",
    info: "",
    userId: "",
  });

  console.log(userInput);

  const handleChangeUserInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  //POSITIONSTACK API TO GET COORDINATES OF ADDRESS
  // const getCoordinates = useCallback(async () => {
  //   try {
  //     const resp = await axios.get(
  //       `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_COORDINATE_KEY}&query=${userInput.address}&limit=1`
  //     );
  //     setUserInput({
  //       ...userInput,
  //       lat: resp.data.data[0].latitude,
  //       lng: resp.data.data[0].longitude,
  //     });
  //     setSuccess("succeeded");
  //   } catch (err) {
  //     console.log("Error: ", err);
  //     setFailed("error");
  //   }
  // }, [userInput]);

  // GOOGLE GEOCODING API TO GET ADDRESS FROM COORDINATES
  const getCoordinates = useCallback(
    async (e) => {
      try {
        const resp = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput.address}&key=${process.env.REACT_APP_GEOCODING_KEY}`
        );
        setUserInput({
          ...userInput,
          lat: resp.data.results[0].geometry.location.lat,
          lng: resp.data.results[0].geometry.location.lng,
        });
        setSuccess("succeeded");
      } catch (err) {
        console.log(err);
        setFailed("error");
      }
    },
    [userInput]
  );

  //SUCCESS AND FAILED SEND MESSAGES
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("")

  //SUCCESS AND FAILED SEND MESSAGES TIMEOUT
  useEffect(() => {
    if (success === "succeeded") {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } else {
      if (failed === "error") {
        setTimeout(() => {
          setFailed("");
        }, 5000);
      }
    }
  }, [success, failed]);

  // useEffect(() => {
  //   if(uploadSuccess === "uploaded"){
  //     setTimeout(() => {
  //       setUploadSuccess("");
  //     }, 2000);
  //   }
  // },[uploadSuccess])


  //GET USER ID FROM USER
  useEffect(() => {
    axios(
      `http://localhost:8000/user/${user.sub.slice(user.sub.length - 7)}`
    ).then((response) =>
      setUserInput({...userInput, userId: response.data.id})
    );
  }, [user.sub]);

  //POST REQUEST TO MONGODB
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/tree/", userInput)
      .then((res) => {
        console.log(res);
        setUploadSuccess("uploaded");
        setTimeout(() => {navigate('/profil')}, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };

  return (
    <>
      <div>
        <LogoComponent />
        <div className="tree-form-container">
          <h3>Obstbaum zur Verfügung stellen</h3>

          <div className="tree-form">
            <label>Standort*</label>
            <input
              className="tree-input-field"
              type="text"
              name="address"
              placeholder="Straße, Hausnummer, Ort"
              onChange={handleChangeUserInput}
              required
            />
            {success && renderAlert()}
            {failed && renderFailed()}
            <button
              className="address-btn"
              onClick={getCoordinates}
              disabled={!userInput.address}
            >
              Adresse bestätigen
            </button>
          </div>

          <form
            className="tree-form"
            name="userId"
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormControl sx={{ m: 0, width: 340, backgroundColor: "white" }}>
              <InputLabel id="Obstsorte" sx={{ fontFamily: "Nunito" }}>
                Obstsorte*
              </InputLabel>
              <Select
                name="type"
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
                required
              >
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

            <label>Erntezeitraum</label>
            <p>von</p>
            <input
              className="tree-input-field"
              type="date"
              name="start"
              id="start"
              onChange={handleChangeUserInput}
            />
            <p>bis</p>
            <input
              className="tree-input-field"
              type="date"
              id="end"
              name="end"
              onChange={handleChangeUserInput}
            />

            <label>Infos</label>
            <textarea
              className="tree-input-field"
              type="text"
              name="info"
              onChange={handleChangeUserInput}
              cols="30"
              rows="5"
              placeholder="Nähere Informationen zum Standort, der Zugänglickeit z.B. Pflücken nur nach Absprache möglich etc."
            ></textarea>

            {/* <input type="file" /> */}

            {uploadSuccess && renderUpload()}
            <input
              type="submit"
              className="submit btn"
              disabled={!userInput.address || !userInput.type}
              defaultValue="Hinzufügen"
            />
          </form>
        </div>
      </div>
    </>
  );
}

const renderAlert = () => (
  <div className="">
    <p style={{ color: "green" }}>Adresse bestätigt</p>
  </div>
);

const renderFailed = () => (
  <div className="">
    <p style={{ color: "red" }}>Adresse nicht gefunden</p>
  </div>
);

const renderUpload = () => (
  <div className="">
    <p style={{ color: "green" }}>Baum wurde erfolgreich hochgeladen</p>
  </div>
);