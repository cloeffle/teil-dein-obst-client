import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "../assets/styles/myTrees.css";
import LogoComponent from "../components/LogoComponent";
import Delete from "../assets/images/icons8-entfernen.svg";

function Tree({closeModal}) {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(false);
  const [userTrees, setUserTrees] = useState(false);

  useEffect(() => {
    axios(
      `http://localhost:8000/tree/collection/${user.sub.slice(
        user.sub.length - 7
      )}`
    ).then((response) => setUserTrees(response.data));
  }, [userData]);

  const deleteTree = (id) => {
    axios.delete(`http://localhost:8000/tree/${id}`).then(() => {
      axios(
        `http://localhost:8000/tree/collection/${user.sub.slice(
          user.sub.length - 7
        )}`
      ).then((response) => setUserTrees(response.data));
    });
  };

  return (
    <>
      <div className="my-trees-container">
        <div className="my-trees">
          <table>
            {/* <thead>
              <tr>
                <th>Sorte</th>
                <th>Adresse</th>
                <th>Status</th>
              </tr>
            </thead> */}
            <tbody>
              {userTrees &&
                userTrees.map((myTrees) => (
                  <tr key={myTrees._id}>
                    <td className="my-tree-type">{myTrees.type}</td>
                    <td className="my-tree-address">
                      {myTrees.location.address}
                    </td>
                    <td className="my-tree-status">
                      {myTrees.active === true ? (
                        <p style={{ color: "green" }}>aktiv</p>
                      ) : (
                        <p style={{ color: "red" }}>inaktiv</p>
                      )}
                    </td>
                    <td>
                      <button
                        className="delete-tree"
                        onClick={() => deleteTree(myTrees._id)}
                      >
                        <img src={Delete} alt="Löschen" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Tree;
