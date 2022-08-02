//dependencies
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";

//css
import "./UpcomingEventsCountDownTimer.css";

//components
import { EditContext } from "../../../Context/EditContext";

//code
const UpcomingEventsCountDownTimer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const [now, setNow] = useState();
  const [t, setT] = useState();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [deadline, setDeadline] = useState();

  //handlers

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "upcomingevents"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, []);

  //timeouthandler
  const x = setTimeout(function () {
    setNow(new Date().getTime());
    setDeadline(new Date(data[0].future_date).getTime());
    setT(deadline - now);
    setDays(Math.floor(t / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((t % (1000 * 60)) / 1000));

    if (t < 0) {
      clearTimeout(x);
    }
  }, 1000);

  return (
    <div className="upcoming-events-count-down-timer-container  white">
      {/* false */}
      {t < 0 && (
        <div>
          <div className="count-down mt-5">
            <div className="count-down-date count-down-individual-container">
              <h3>days</h3>
            </div>
            <div className="count-down-hours count-down-individual-container">
              <h3>hours</h3>
            </div>
            <div className="count-down-minutes count-down-individual-container">
              <h3>mins</h3>
            </div>
            <div className="count-down-seconds count-down-individual-container">
              <h3>secs</h3>
            </div>
          </div>
          {/* count down buttons */}
          <div className="count-down-buttons">
            <button
              className="count-down-edit-btn admin-edit-btn"
              data-toggle="modal"
              data-target="#modal-fullscreen-xl"
              data-bs-toggle="modal"
              data-bs-target="#addEditModal"
              onClick={() => EditHandler("id1653283802840")}
            >
              SET NEW
            </button>
          </div>
        </div>
      )}

      {/* true */}
      {t > 0 &&
        data.map((d) => (
          <div key={d.timeStamp}>
            <div className="count-down mt-5">
              <div className="count-down-date count-down-individual-container">
                <h3>{days}days</h3>
              </div>
              <div className="count-down-hours count-down-individual-container">
                <h3>{hours}hours</h3>
              </div>
              <div className="count-down-minutes count-down-individual-container">
                <h3>{minutes}mins</h3>
              </div>
              <div className="count-down-seconds count-down-individual-container">
                <h3>{seconds}secs</h3>
              </div>
            </div>
            {/* count down buttons */}
            <div className="count-down-buttons">
              <button
                className="count-down-edit-btn admin-edit-btn"
                data-toggle="modal"
                data-target="#modal-fullscreen-xl"
                data-bs-toggle="modal"
                data-bs-target="#addEditModal"
                onClick={() => EditHandler(d.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UpcomingEventsCountDownTimer;
