import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import Logo from "../assets/logo/Logo.svg";
import Login from "../components/Login/LoginButton";
import Apfel from "../assets/images/icons8-apple-500.png";
import Aprikose from "../assets/images/icons8-apricot-500.png";
import Blaubeere from "../assets/images/icons8-blueberry-500.png";
import Himbeere from "../assets/images/icons8-raspberry-500.png";
import Johannisbeere from "../assets/images/icons8-redcurrant-512.png";
import Kirsche from "../assets/images/icons8-cherry-500.png";
import Weintraube from "../assets/images/icons8-grapes-500.png";
import Pflaume from "../assets/images/icons8-plum-500.png";
import Erdbeere from "../assets/images/icons8-strawberry-500.png";
import Stachelbeere from "../assets/images/icons8-gooseberry-500-2.png";
import Sonstiges from "../assets/images/fruit basket 500.png";
import Birne from "../assets/images/icons8-pear-500.png";
import Like_black from "../assets/images/Like_black.png";
import Like_red from "../assets/images/Like_red.png";

import "../assets/styles/locationDetails.css";

function LocationDetails({ locationData }) {
  //GET LOCATION DATA FOR SPECIFIC LOCATION (ID)
  console.log("locationData", locationData);
  const params = useParams();
  const [locationDetail, setLocationDetail] = useState(false);

  useEffect(() => {
    if (locationData) {
      const detail = locationData.find(function (location) {
        return location._id === params.id;
      });
      setLocationDetail(detail);
    }
  }, [locationData]);

  console.log("LOCATIONDETAIL", locationDetail);

  //GET USER DATA FROM AUTH0
  const { user } = useAuth0();
  const [userData, setUserData] = useState([]);
  console.log("USER", userData);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user) {
      axios(`http://localhost:8000/user/${user.sub.slice(user.sub.length - 7)}`)
        .then((res) => {
          setUserData(res.data);
          if (res.data.favorites.includes(locationDetail._id)) {
            setLiked(true);
            console.log("faved");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  //ADD TO FAVAORITES
  // const [favorite, setFavorite] = useState(null);
  const handleLike = () => {
    setLiked(!liked);
    console.log(locationDetail._id);
    // setFavorite(locationDetail._id);
    axios
      .put(
        `http://localhost:8000/user/liketree/${user.sub.slice(
          user.sub.length - 7
        )}`,
        {
          treeId: locationDetail._id,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [favorite, setFavorite] = useState(null);
  const handleDislike = () => {
    setLiked(!liked);
    console.log(locationDetail._id);
    // setFavorite(locationDetail._id);
    axios
      .put(
        `http://localhost:8000/user/disliketree/${user.sub.slice(
          user.sub.length - 7
        )}`,
        {
          treeId: locationDetail._id,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //GET COMMENTS
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (locationDetail) {
      axios(`http://localhost:8000/comment/${locationDetail._id}`)
        .then((res) => setCommentList(res.data))
        .catch((err) => console.log(err));
    }
  }, [locationDetail]);

  //POST COMMENT
  const [comment, setComment] = useState({
    comment: "",
    timestamp: "",
    user: "",
    tree: "",
    avatar: "",
  });

  let timestamp = new Date().toGMTString();

  //POST COMMENT
  const handleChange = (e) => {
    setComment({
      [e.target.name]: e.target.value,
      timestamp: timestamp,
      user: user.name,
      tree: locationDetail._id,
      avatar: user.picture,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment", comment);
    axios
      .post("http://localhost:8000/comment/", comment)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        axios(`http://localhost:8000/comment/${locationDetail._id}`).then(
          (res) => setCommentList(res.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };

  return (
    <>
      {locationData.length > 0 && (
        <div className="locationDetails">
          <div className="header-login">
            <div className="logo-wrapper">
              <div className="home-logo">
                <a href="/">
                  <img src={Logo} alt="logo" />
                </a>
              </div>
            </div>
            <Login />
          </div>
          <div className="locationDetails-wrapper">
            <div className="locationDetails-content">
              {locationDetail && (
                <>
                  <div className="details-fruit">
                    {locationDetail.type[0] === "Apfel" && (
                      <img src={Apfel} alt="Apfel-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Aprikose" && (
                      <img src={Aprikose} alt="Aprikose-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Birne" && (
                      <img src={Birne} alt="Birne-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Heidelbeere" && (
                      <img src={Blaubeere} alt="Blaubeere-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Himbeere" && (
                      <img src={Himbeere} alt="Himbeere-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Johannisbeere" && (
                      <img
                        src={Johannisbeere}
                        alt="Johannisbeere-Icon"
                        height={50}
                      />
                    )}
                    {locationDetail.type[0] === "Kirsche" && (
                      <img src={Kirsche} alt="Kirsche-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Weintraube" && (
                      <img
                        src={Weintraube}
                        alt="Weintraube-Icon"
                        height={50}
                      />
                    )}
                    {locationDetail.type[0] === "Pflaume" && (
                      <img src={Pflaume} alt="Pflaume-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Erdbeere" && (
                      <img src={Erdbeere} alt="Erdbeere-Icon" height={50} />
                    )}
                    {locationDetail.type[0] === "Stachelbeere" && (
                      <img
                        src={Stachelbeere}
                        alt="Stachelbeere-Icon"
                        height={50}
                      />
                    )}
                    {locationDetail.type[0] === "Sonstiges" && (
                      <img src={Sonstiges} alt="Obstkorb" height={50} />
                    )}
                    <div>
                      <h4>{locationDetail.type[0]}</h4>

                      <div className="like-btn">
                        <p>Favorit</p>
                        {!liked && (
                          <>
                            <div className="heart" onClick={handleLike}>
                              <img src={Like_black} alt="" height={20} />
                            </div>
                          </>
                        )}
                        {liked && (
                          <>
                            <div className="heart" onClick={handleDislike}>
                              <img src={Like_red} alt="" height={20} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="locationDetails-details">
                    <h4>Wo?</h4>
                    <p>{locationDetail.location.address}</p>
                  </div> */}

                  {locationDetail.harvestPeriod.start.length > 0 && (
                    <div className="harvest-start-details">
                      <h4>Erntezeitraum</h4>
                      <p>
                        von {locationDetail.harvestPeriod.start} bis{" "}
                        {locationDetail.harvestPeriod.end}
                      </p>
                    </div>
                  )}

                  {locationDetail.info.length > 0 && (
                    <div className="details-owner">
                      <h4>Info des Besitzers:</h4>
                      <p>{locationDetail.info}</p>
                    </div>
                  )}

                  {locationDetail.pictureURL.length > 2 && (
                    <div className="tree-picture">
                      <img src={locationDetail.pictureURL} alt="" />
                    </div>
                  )}
                </>
              )}
            </div>
            {user ? (
              <div className="locationDetails-details" id="write-comment">
                <form className="commentForm" onSubmit={(e) => handleSubmit(e)}>
                  <textarea
                    className="commentTextarea"
                    type="text"
                    name="comment"
                    value={comment.text}
                    onBlur={handleChange}
                    placeholder="Hinterlasse einen Kommentar"
                    required
                  ></textarea>
                  <div className="comment-btn">
                    <input
                      type="submit"
                      className="submit btn"
                      value="Kommentieren"
                    />
                  </div>
                </form>
              </div>
            ) : (
              <div className="locationDetails-content">
                <h4>Kommentare</h4>
              </div>
            )}
            <div className="locationDetails-content">
              {!commentList.length > 0 && (
                <p style={{ fontSize: "14px", fontStyle: "italic" }}>
                  Keine Kommentare
                </p>
              )}
            </div>
            <div className="comment-container">
              {commentList &&
                commentList.map((comment, index) => (
                  <div key={index}>
                    <div className="comment-wrapper">
                      <div className="comment-avatar">
                        <img src={comment.avatar} alt="Avatar" />
                      </div>
                      <div className="comment-content">
                        <div className="comment-user">
                          <p className="comment-user-name">{comment.user}</p>
                          <p className="comment-user-timestamp">
                            {comment.timestamp}
                          </p>
                        </div>
                        <div className="comment-text">
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetails;
