import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "../assets/styles/myTrees.css";
import Delete from "../assets/images/icons8-entfernen.svg";

function Tree() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(false);
  const [userTrees, setUserTrees] = useState(false);

  //GET USERS TREE DATA
  useEffect(() => {
    axios(
      `http://localhost:8000/tree/collection/${user.sub.slice(
        user.sub.length - 7
      )}`
    ).then((response) => setUserTrees(response.data));
  }, [userData]);

  //DELETE TREE
  const deleteTree = (id) => {
    axios.delete(`http://localhost:8000/tree/${id}`).then(() => {
      axios(
        `http://localhost:8000/tree/collection/${user.sub.slice(
          user.sub.length - 7
        )}`
      ).then((response) => setUserTrees(response.data));
    });
  };

  //DEACTIVATE/REACTIVATE TREE
  const deactivateTree = (id) => {
    axios.put(`http://localhost:8000/tree/${id}`).then(() => {
      axios(
        `http://localhost:8000/tree/collection/${user.sub.slice(
          user.sub.length - 7
        )}`
      ).then((response) => setUserTrees(response.data));
    });
  };

  const reactivateTree = (id) => {
    axios.put(`http://localhost:8000/tree/${id}/reactivate`).then(() => {
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
            <tbody>
              {!userTrees.length > 0 && (
                <tr>
                  <td style={{ fontSize: "14px", fontStyle: "italic" }}>
                    Keine zu bearbeiteten Obstbäume-/sträucher gefunden
                  </td>
                </tr>
              )}
              {userTrees &&
                userTrees.map((myTrees) => (
                  <tr key={myTrees._id}>
                    <td className="my-tree-type-modal">
                      {myTrees.type.join(", ")}
                    </td>
                    <td className="my-tree-address-modal">
                      {myTrees.location.address}
                    </td>
                    <td className="deactivate-reactivate-btn">
                      {myTrees.active === true ? (
                        <button
                          className="activate-tree"
                          onClick={() => deactivateTree(myTrees._id)}
                        >
                          aktiv
                        </button>
                      ) : (
                        <button
                          className="deactivate-tree"
                          onClick={() => reactivateTree(myTrees._id)}
                        >
                          inaktiv
                        </button>
                      )}
                    </td>
                    <td className="delete-tree">
                      <button
                        className="delete-tree-btn"
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
