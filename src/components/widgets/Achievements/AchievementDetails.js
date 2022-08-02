//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";
import React from "react";
import { useParams} from "react-router-dom";

//components
import { EditContext } from "../../../Context/EditContext";
import Modal from "../Modal.js";

//css
import "./AchivementDetails.css";
import "../../widgets/Table.css";

//code
const AchievementDetails = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const { id } = useParams();


  //handlers

  //deletehandler
  const DeleteHandler = async (deleteId) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, `achievements/${id}/persons`, deleteId));
      setData(data.filter((item) => item.id !== id));
    }
  };

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(
        collection(db, `achievements/${id}/persons`),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
          dispatch({ type: "CLICKED" });
          return;
        }
      );
      return () => {
        unsub();
      };
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="achievements-display-title mt-5 text-center">
        <h1 className="achievement-details-header">{`${id.toUpperCase()} ACHIVEMENTS`}</h1>
      </div>
      <div className="achievementdetails">
        {/* display table */}
        <table className="text-white mt-2 achievement-details-table">
          <thead>
            <tr>
              <th>Name/Team Name</th>
              <th>Game</th>
              <th>Event Name</th>
              <th>Position</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data
              .slice(0)
              .reverse()
              .map((d) => {
                return (
                  <tr key={d["timeStamp"]}>
                    <td>{d["name"]}</td>
                    <td>{d["game"]}</td>
                    <td>{d["eventname"]}</td>
                    <td>{d["position"]}</td>
                    <td>
                      <button
                        className="atheleticHonors-edit-button admin-edit-btn me-2 me-2"
                        data-toggle="modal"
                        data-target="#modal-fullscreen-xl"
                        data-bs-toggle="modal"
                        data-bs-target="#addEditModal"
                        onClick={() => {
                          EditHandler(d.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={() => {
                          DeleteHandler(d.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal />
    </>
  );
};

export default AchievementDetails;
