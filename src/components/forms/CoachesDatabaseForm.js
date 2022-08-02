//dependencies
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useContext, useEffect, useState } from "react";

//components
import { EditContext } from "../../Context/EditContext";

//css
import "./Forms.css";

//code
const CoachesDatabaseForm = () => {
  //states
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);
  const [coachId, setCoachId] = useState(1);
  const [editKeyword, setEditKeyword] = useState("");
  //handlers

  //fetch coaches id
  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, `coachescount`), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        list.map((l) => {
          setCoachId(l["ccount"]);
        });
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, []);

  //searchkeywordhandler
  const searchKeywords = (key) => {
    key = key.toLowerCase();
    console.log("change", key);
    let search = [];

    for (let i = 1; i <= key.length; i++) {
      search.push(key.substring(0, i));
    }

    return search;
  };

  //addhandler
  const AddHandler = async (event) => {
    event.preventDefault();
    try {
      const id = "id" + new Date().getTime();
      await setDoc(doc(db, "coaches", id), {
        ...data,
        coach_id: `c${coachId + 1}`,
        timeStamp: serverTimestamp(),
        searchKeywords: searchKeywords(data["coach-name"]),
      });
      await setDoc(doc(db, "coachescount/", "5mvPsiEREkb1isMkQsE7"), {
        ccount: coachId + 1,
      });
      setData({});
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //addinputhandler
  const InputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  //edithandler
  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "coaches", id), {
        ...editData,
        timeStamp: serverTimestamp(),
        searchKeywords: searchKeywords(editKeyword),
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
    setEditKeyword(value);
    setEditData({
      ...editData,
      [id]: value,
      searchKeywords: [],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "coaches", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="coaches-database-form-container menu2-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* CoachName */}
          <div className="individual-form-container">
            <label htmlFor="coach-name" className="form-label">
              Coach Name
            </label>
            <input
              required
              type="text"
              id="coach-name"
              name="coach-name"
              defaultValue=""
              className="form-control form-input"
              placeholder="Coach Name"
              onChange={InputHandler}
            />
          </div>

          {/*CoachExpertise*/}
          <div className="individual-form-container">
            <label htmlFor="coach-game" className="form-label">
              Field of Expertise
            </label>
            <input
              required
              type="text"
              id="coach-game"
              name="coach-game"
              defaultValue=""
              className="form-control form-input"
              placeholder="field of expertise"
              onChange={InputHandler}
            />
          </div>

          {/* coachexperience */}
          <div className="individual-form-container">
            <label htmlFor="coach-experience" className="form-label">
              Experience
            </label>
            <input
              required
              type="number"
              id="coach-experience"
              name="coach-experience"
              defaultValue=""
              className="form-control form-input"
              placeholder="Coach Experience"
              onChange={InputHandler}
            />
          </div>

          {/* CoachAchievements */}
          <div className="individual-form-container">
            <label htmlFor="coach-achievements" className="form-label">
              Coach Achievements
            </label>
            <input
              required
              type="text"
              id="coach-achievements"
              name="coach-achievements"
              defaultValue=""
              className="form-control form-input"
              placeholder="coach achievements"
              onChange={InputHandler}
            />
          </div>

          {/* coachstatus */}
          <div className="individual-form-container">
            <label htmlFor="coach-status" className="form-label">
              Coach Status
            </label>
            <select
              required
              name="coach-status"
              id="coach-status"
              className="form-control form-input"
              onChange={InputHandler}
              defaultValue=""
            >
              <option default value="">
                Select status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/*coachContact*/}
          <div className="individual-form-container">
            <label htmlFor="coach-contact" className="form-label">
              Coach Contact
            </label>
            <input
              required
              type="number"
              id="coach-contact"
              defaultValue=""
              name="coach-contact"
              className="form-control form-input"
              placeholder="coach contact"
              onChange={InputHandler}
            />
          </div>

          {/* coachGender */}
          <div className="individual-form-container">
            <label htmlFor="coach-gender" className="form-label">
              Gender
            </label>
            <select
              required
              name="coach-gender"
              id="coach-gender"
              defaultValue=""
              className="form-control form-input"
              onChange={InputHandler}
            >
              <option default value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>
            </select>
          </div>

          {/* coachBloodGroup */}
          <div className="individual-form-container">
            <label htmlFor="coach-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              required
              name="coach-blood-group"
              id="coach-blood-group"
              className="form-control form-input"
              onChange={InputHandler}
              defaultValue=""
            >
              <option default value="">
                Select blood group
              </option>
              <option value="A+ve">A+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="A1+ve">A1+ve</option>
              <option value="A1-ve">A1-ve</option>
              <option value="A1B+ve">A1B+ve</option>
              <option value="A1B-ve">A1B-ve</option>
              <option value="A2+ve">A2+ve</option>
              <option value="A2-ve">A2-ve</option>
              <option value="A2B+ve">A2B+ve</option>
              <option value="A2B-ve">A2B-ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="AB-ve">AB-ve</option>
              <option value="B+ve">B+ve</option>
              <option value="B-ve">B-ve</option>
              <option value="Bombay Blood Group">Bombay Blood Group</option>
              <option value="INRA">INRA</option>
              <option value="O+ve">O+ve</option>
              <option value="O-ve">O-ve</option>
            </select>
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
      )}

      {isClicked && (
        <form onSubmit={EditHandler}>
          {/* CoachName */}
          <div className="individual-form-container">
            <label htmlFor="coach-name" className="form-label">
              Coach Name
            </label>
            <input
              type="text"
              id="coach-name"
              value={editData["coach-name"]}
              name="coach-name"
              className="form-control form-input"
              placeholder="Coach Name"
              onChange={EditInputHandler}
            />
          </div>

          {/*CoachExpertise*/}
          <div className="individual-form-container">
            <label htmlFor="coach-game" className="form-label">
              Field of Expertise
            </label>
            <input
              type="text"
              value={editData["coach-game"]}
              id="coach-game"
              name="coach-game"
              className="form-control form-input"
              placeholder="field of expertise"
              onChange={EditInputHandler}
            />
          </div>

          {/* coachexperience */}
          <div className="individual-form-container">
            <label htmlFor="coach-experience" className="form-label">
              Experience
            </label>
            <input
              type="number"
              id="coach-experience"
              name="coach-experience"
              value={editData["coach-experience"]}
              className="form-control form-input"
              placeholder="Coach Experience"
              onChange={EditInputHandler}
            />
          </div>

          {/* CoachAchievements */}
          <div className="individual-form-container">
            <label htmlFor="coach-achievements" className="form-label">
              Coach Achievements
            </label>
            <input
              type="text"
              id="coach-achievements"
              name="coach-achievements"
              value={editData["coach-achievements"]}
              className="form-control form-input"
              placeholder="coach achievements"
              onChange={EditInputHandler}
            />
          </div>

          {/* coachstatus */}
          <div className="individual-form-container">
            <label htmlFor="coach-status" className="form-label">
              Coach Status
            </label>
            <select
              name="coach-status"
              id="coach-status"
              value={editData["coach-status"]}
              className="form-control form-input"
              onChange={EditInputHandler}
            >
              <option default value="">
                Select status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/*coachContact*/}
          <div className="individual-form-container">
            <label htmlFor="coach-contact" className="form-label">
              Coach Contact
            </label>
            <input
              type="number"
              id="coach-contact"
              value={editData["coach-contact"]}
              name="coach-contact"
              className="form-control form-input"
              placeholder="coach contact"
              onChange={EditInputHandler}
            />
          </div>

          {/* coachGender */}
          <div className="individual-form-container">
            <label htmlFor="coach-gender" className="form-label">
              Gender
            </label>
            <select
              name="coach-gender"
              id="coach-gender"
              className="form-control form-input"
              value={editData["coach-gender"]}
              onChange={EditInputHandler}
            >
              <option default value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>
            </select>
          </div>

          {/* coachBloodGroup */}
          <div className="individual-form-container">
            <label htmlFor="coach-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              name="coach-blood-group"
              value={editData["coach-blood-group"]}
              id="coach-blood-group"
              className="form-control form-input"
              onChange={EditInputHandler}
            >
              <option default value="">
                Select blood group
              </option>
              <option value="A+ve">A+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="A1+ve">A1+ve</option>
              <option value="A1-ve">A1-ve</option>
              <option value="A1B+ve">A1B+ve</option>
              <option value="A1B-ve">A1B-ve</option>
              <option value="A2+ve">A2+ve</option>
              <option value="A2-ve">A2-ve</option>
              <option value="A2B+ve">A2B+ve</option>
              <option value="A2B-ve">A2B-ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="AB-ve">AB-ve</option>
              <option value="B+ve">B+ve</option>
              <option value="B-ve">B-ve</option>
              <option value="Bombay Blood Group">Bombay Blood Group</option>
              <option value="INRA">INRA</option>
              <option value="O+ve">O+ve</option>
              <option value="O-ve">O-ve</option>
            </select>
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
      )}
    </div>
  );
};

export default CoachesDatabaseForm;
