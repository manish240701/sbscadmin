//dependencies
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

//components
import { EditContext } from "../../Context/EditContext";

//css
import "./Forms.css";

//code
const UpcomingEventsForm = () => {
  //states
  let history = useHistory();
  const [editData, setEditData] = useState({});
  const { isClicked } = useContext(EditContext);
  const [eventId] = useState("id1653283802840");

  //handlers

  //edithandler
  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "upcomingevents", eventId), {
        ...editData,
        timeStamp: serverTimestamp(),
      });
      console.log("saved");
      history.push("/upcomingevents");
    } catch (error) {
      console.log(error);
    }
  };

  //editinputhandler
  const EditInputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setEditData({
      ...editData,
      [id]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "upcomingevents", eventId);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, eventId]);

  return (
    <div className="upcoming-events-form-container">
      {
        <form onSubmit={EditHandler}>
          {/* future date */}
          <div className="individual-form-container">
            <label htmlFor="future_date" className="form-label">
              Future Date
            </label>
            <input
              type="datetime-local"
              name="future_date"
              id="future_date"
              className="form-control form-input"
              onChange={EditInputHandler}
              value={editData["future_date"]}
            />
          </div>

          {/* Form Download link */}
          <div className="individual-form-container">
            <label htmlFor="events-download-link" className="form-label">
              Form Download Link
            </label>
            <input
              type="url"
              id="events-download-link"
              name="events-download-link"
              className="form-control form-input"
              placeholder="Enter form Download URL"
              onChange={EditInputHandler}
              value={editData["events-download-link"]}
            />
          </div>

          {/* moredetails */}
          <div className="individual-form-container">
            <label htmlFor="events-details-link" className="form-label">
              More Details Link
            </label>
            <input
              type="url"
              id="events-details-link"
              name="events-details-link"
              className="form-control form-input"
              placeholder="Enter form Details url"
              onChange={EditInputHandler}
              value={editData["events-details-link"]}
            />
          </div>

          {/*Submit buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn modal-form-btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn modal-form-btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default UpcomingEventsForm;
