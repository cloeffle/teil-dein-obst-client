import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { initializeApp } from 'firebase/app';
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import LogoComponent from '../components/LogoComponent';
import '../assets/styles/treeRegistration.css';
import Delete from '../assets/images/icons8-entfernen.svg';

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
  'Apfel',
  'Aprikose',
  'Birne',
  'Erdbeere',
  'Heidelbeere',
  'Himbeere',
  'Johannisbeere',
  'Kirsche',
  'Stachelbeere',
  'Weintraube',
  'Pflaume',
  'Sonstiges',
];

const useStyles = makeStyles(() => ({
  root: {
    '& $notchedOutline': {
      borderWidth: 0,
      borderRadius: '32px',
    },
    '&:hover $notchedOutline': {
      borderWidth: 0,
    },
    '&$focused $notchedOutline': {
      borderWidth: 0,
    },
  },
  focused: {},
  notchedOutline: {},
}));

function getStyles(fruit, fruitName, theme) {
  return {
    fontWeight:
      fruitName.indexOf(fruit) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,

    color: '#444',

    backgroundColor: fruitName.indexOf(fruit) === -1 ? 'white' : '#c8e0c3',
    fontFamily: 'Nunito',
  };
}

export default function TreeRegistration() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const theme = useTheme();
  const [fruitName, setFruitName] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageName, setImageName] = useState('');
  const classes = useStyles();

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Select Fruits Option
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setFruitName(typeof value === 'string' ? value.split(',') : value);
    const myFruit = typeof value === 'string' ? value.split(',') : value;
    setUserInput({
      ...userInput,
      type: myFruit,
    });
  };

  // Form Input
  const [userInput, setUserInput] = useState({
    type: '',
    lat: '',
    lng: '',
    start: '',
    end: '',
    info: '',
    userId: '',
    pictureURL: '',
  });

  const handleChangeUserInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

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
        setSuccess('succeeded');
      } catch (err) {
        console.log(err);
        setFailed('error');
      }
    },
    [userInput]
  );

  //SUCCESS AND FAILED SEND MESSAGES
  const [success, setSuccess] = useState('');
  const [failed, setFailed] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [imgUploadSuccess, setImgUploadSuccess] = useState('');

  //SUCCESS AND FAILED SEND MESSAGES TIMEOUT
  useEffect(() => {
    if (success === 'succeeded') {
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } else {
      if (failed === 'error') {
        setTimeout(() => {
          setFailed('');
        }, 3000);
      }
    }
  }, [success, failed]);

  //GET USER ID FROM USER
  useEffect(() => {
    axios(
      `https://teile-deine-obst.herokuapp.com/user/${user.sub.slice(
        user.sub.length - 7
      )}`
    ).then((response) =>
      setUserInput({ ...userInput, userId: response.data.id })
    );
  }, [user.sub]);

  //POST REQUEST TO MONGODB
  const imageToDB = (e) => {
    e.preventDefault();
    if (imageUpload) {
      const name = `images/${imageName}`;
      const imageRef = ref(storage, name);
      uploadBytes(imageRef, imageUpload).then(() =>
        getDownloadURL(imageRef).then((url) => {
          setUserInput({ ...userInput, pictureURL: url });
          console.log(url);
        })
      );
    }
    setTimeout(() => {
      setImgUploadSuccess('uploaded');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://teile-deine-obst.herokuapp.com/tree/", userInput)
      .then((res) => {
        console.log(res);
        setUploadSuccess("uploaded");
        setTimeout(() => {
          navigate("/profil");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // e.target.reset();

  const handleImage = (target) => {
    const fileSize = target.size / 1024 / 1024;
    if (fileSize <= 10) {
      setImageUpload(target);
      setImageName(target.name + uuidv4());
    } else {
      alert('Das Bild übersteigt die zulässige Größe von 10 MB');
      setImageUpload(null);
    }
  };

  const deleteImage = () => {
    setImageUpload(null);

    if (userInput.pictureURL.length > 2) {
      const desertRef = ref(storage, userInput.pictureURL);
      deleteObject(desertRef)
        .then(() => console.log('Bild gelöscht'))
        .catch((error) => console.log(error));
    }
    setImgUploadSuccess('');
  };

  return (
    <>
      <div>
        <LogoComponent />
        <div className="tree-form-container">
          <h3>Obst zur Verfügung stellen</h3>
          <div className="tree-form">
            <label>Standort</label>
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
            <div className="address-confirm">
              <button
                className="address-btn"
                onClick={getCoordinates}
                disabled={!userInput.address}
              >
                Adresse bestätigen
              </button>
            </div>
          </div>

          <form
            className="tree-form"
            name="userId"
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormControl
              sx={{
                m: 0,
                width: 340,
                backgroundColor: 'white',
                borderRadius: '32px',
              }}
            >
              <InputLabel id="Obstsorte" sx={{ fontFamily: 'Nunito' }}>
                Obstsorte
              </InputLabel>
              <Select
                name="type"
                labelId="Obstsorte"
                id="Obstsorte"
                multiple
                value={fruitName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-obstsorte"
                    label="Obstsorte"
                    disableunderline="true"
                    notched={true}
                    classes={classes}
                    value={1}
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        sx={{
                          backgroundColor: '#c8e0c3',
                          color: '#444',
                          fontFamily: 'Nunito',
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
            <div className="harvest-date">
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
            </div>

            <label>Infos</label>
            <textarea
              className="tree-input-field"
              type="text"
              name="info"
              onChange={handleChangeUserInput}
              cols="30"
              rows="5"
              placeholder="Nähere Informationen zum Standort, der Zugänglickeit etc."
            ></textarea>
            <div className="image-upload-wrapper">
              <label>Foto hochladen</label>
              {imgUploadSuccess && renderImgUpload()}
              <div className="image-upload-container">
                <div className="image-icon-btn">
                  <label>
                    <img
                      className="upload-icon"
                      src="https://img.icons8.com/bubbles/344/image.png"
                      alt="upload icon"
                    ></img>
                    <input
                      onChange={(event) => handleImage(event.target.files[0])}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                    ></input>
                  </label>
                </div>
                <div className="image-btn">
                  {imageUpload && (
                    <>
                      <p>{imageUpload.name}</p>
                      <button
                        className="image-upload-btn"
                        onClick={(e) => imageToDB(e)}
                      >
                        Hochladen
                      </button>
                      <button
                        className="delete-tree-btn"
                        onClick={() => deleteImage()}
                      >
                        <img src={Delete} alt="Löschen" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {uploadSuccess && renderUpload()}
            <div className="send-btn">
              <input
                type="submit"
                className="submit btn"
                disabled={!userInput.address || !userInput.type}
                value="Hinzufügen"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const renderAlert = () => (
  <div className="tree-upload-success">
    <p>Adresse bestätigt</p>
  </div>
);

const renderFailed = () => (
  <div className="address-fail">
    <p>Adresse nicht gefunden</p>
  </div>
);

const renderUpload = () => (
  <div className="tree-upload-success">
    <p>Dein Obstbaum/-strauch wurde erfolgreich hochgeladen</p>
  </div>
);

const renderImgUpload = () => (
  <div className="tree-upload-success">
    <p>Dein Foto wurde erfolgreich hochgeladen</p>
  </div>
);
