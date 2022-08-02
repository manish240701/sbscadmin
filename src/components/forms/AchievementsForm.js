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
const AchievementsForm = () => {
  //states
  const history = useHistory();
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);
  const achievementgame = document.getElementById("achievementgame")?.value;

  //handlers

  //addhandler
  const AddHandler = async (event) => {
    event.preventDefault();
    try {
      const id = "id" + new Date().getTime();
      await setDoc(doc(db, `achievements/${achievementgame}/persons/`, id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setData({});
      console.log(achievementgame);
      history.push("/achievements");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //addinputhandler
  const InputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
    console.log(data);
  };

  //edithandler
  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, `achievements/${achievementgame}/persons`, id), {
        ...editData,
        timeStamp: serverTimestamp(),
      });
      console.log("saved");
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
      const docRef = doc(db, `achievements/${achievementgame}/persons/`, id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(editData);
  }, [isClicked, id]);

  return (
    <div className="achievements-form-container menu3-container">
      <>
        {/* category selection */}
        <div className="individual-form-container">
          <label htmlFor="achievement-student-team-name" className="form-label">
            Select Category
          </label>
          <select
            required
            name="achievementgame"
            id="achievementgame"
            className="form-control"
          >
            <option value="throwball">throwball</option>
            <option value="volleyball">volleyball</option>
          </select>
        </div>

        {!isClicked && (
          <form onSubmit={AddHandler}>
            {/* achievementstudentorteamname */}
            <div className="individual-form-container">
              <label
                htmlFor="achievement-student-team-name"
                className="form-label"
              >
                Student/Team Name
              </label>
              <input
                required
                type="text"
                id="name"
                name="name"
                defaultValue=""
                className="form-control achievements-form-input"
                placeholder="Athlete or Team Name"
                onChange={InputHandler}
              />
            </div>

            {/* achievementeventname */}
            <div className="individual-form-container">
              <label htmlFor="achivement-event-name" className="form-label">
                Event Name
              </label>
              <input
                required
                type="text"
                id="eventname"
                name="eventname"
                defaultValue=""
                className="form-control form-input"
                placeholder="Event Name"
                onChange={InputHandler}
              />
            </div>

            {/* achievementposition */}
            <div className="individual-form-container">
              <label htmlFor="achievement-position" className="form-label">
                Position
              </label>
              <input
                required
                type="text"
                id="position"
                name="position"
                defaultValue=""
                className="form-control achievement-form-input"
                placeholder="position"
                onChange={InputHandler}
              />
            </div>

            {/* achivementgame */}
            <div className="individual-form-container">
              <label htmlFor="achievement-game" className="form-label">
                Game
              </label>
              <input
                required
                type="text"
                id="game"
                name="game"
                defaultValue=""
                className="form-control achievement-form-input"
                placeholder="Game"
                onChange={InputHandler}
              />
            </div>

            <div className="individual-form-container">
              <input
                type="submit"
                value="submit"
                data-bs-dismiss="modal"
                className="form-control bg-primary text-white"
              />
            </div>
          </form>
        )}

        {isClicked && (
          <form onSubmit={EditHandler}>
            {/* achievementstudentorteamname */}
            <div className="individual-form-container">
              <label htmlFor="name" className="form-label">
                Student/Team Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control achievements-form-input"
                placeholder="Athlete or Team Name"
                value={editData["name"]}
                onChange={EditInputHandler}
              />
            </div>

            {/* achievementeventname */}
            <div className="individual-form-container">
              <label htmlFor="eventdetails" className="form-label">
                Event Name
              </label>
              <input
                type="text"
                id="eventname"
                name="eventname"
                className="form-control form-input"
                placeholder="Event Name"
                value={editData["eventname"]}
                onChange={EditInputHandler}
              />
            </div>

            {/* achievementposition */}
            <div className="individual-form-container">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="form-control achievement-form-input"
                placeholder="position"
                value={editData["position"]}
                onChange={EditInputHandler}
              />
            </div>

            {/* achivementgame */}
            <div className="individual-form-container">
              <label htmlFor="game" className="form-label">
                Game
              </label>
              <input
                type="text"
                id="game"
                name="game"
                className="form-control achievement-form-input"
                placeholder="Game"
                value={editData["game"]}
                onChange={EditInputHandler}
              />
            </div>

            <div className="individual-form-container">
              <input
                type="submit"
                value="save"
                className="form-control bg-primary text-white"
                data-bs-dismiss="modal"
              />
            </div>
          </form>
        )}
      </>
    </div>
  );
};

export default AchievementsForm;
