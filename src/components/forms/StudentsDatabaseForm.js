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
import { EditContext } from "../../Context/EditContext";
//css
import "./Forms.css";

//code
const StudentsDatabaseForm = () => {
  //states
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);
  const [studentId, setStudentId] = useState(1);
  const [editKeyword, setEditKeyword] = useState("");

  //handlers

  //fetch student id
  useEffect(() => {
    const fetchData = async () => {
      console.log("i");
      const unsub = onSnapshot(collection(db, `studentscount`), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log(list);
        list.map((l) => {
          setStudentId(l["scount"]);
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
      await setDoc(doc(db, "students", id), {
        ...data,
        studentId: `s${studentId + 1}`,
        timeStamp: serverTimestamp(),
        searchKeywords: searchKeywords(data["student-name"]),
      });
      await setDoc(doc(db, "studentscount/", "4ROHWHnRdRrMHjD2MFGm"), {
        scount: studentId + 1,
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
    setData({
      ...data,
      [id]: value,
    });
  };

  //edithandler
  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "students", id), {
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
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="student-database-form-container menu1-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* StudentName */}
          <div className="individual-form-container">
            <label htmlFor="student-name" className="form-label">
              Student Name
            </label>
            <input
              required
              type="text"
              id="student-name"
              defaultValue=""
              name="student-name"
              className="form-control form-input"
              placeholder="Student Name"
              onChange={InputHandler}
            />
          </div>
          

          {/* StudentContact */}
          <div className="individual-form-container">
            <label htmlFor="student-contact" className="form-label">
              Student Contact
            </label>

            <input
              required
              type="number"
              id="student-contact"
              name="student-contact"
              defaultValue=""
              className="form-control form-input"
              placeholder="Student Contact"
              onChange={InputHandler}
            />
          </div>

          {/* studentParentContact */}
          <div className="individual-form-container">
            <label htmlFor="student-parent-contact" className="form-label">
              Student's Parent's Contact
            </label>
            <input
              required
              type="number"
              name="student-parent-contact"
              id="student-parent-contact"
              defaultValue=""
              className="form-control form-input"
              placeholder="Parent's contact"
              onChange={InputHandler}
            />
          </div>

          {/* FeesRenewal */}
          <div className="individual-form-container">
            <label htmlFor="student-fees-renewal" className="form-label">
              Renewal Date
            </label>
            <input
              required
              type="date"
              defaultValue=""
              id="student-fees-renewal"
              name="student-fees-renewal"
              className="form-control form-input"
              onChange={InputHandler}
            />
          </div>

          {/* studentstatus */}
          <div className="individual-form-container">
            <label htmlFor="student-status" className="form-label">
              Student Status
            </label>
            <select
              required
              defaultValue=""
              name="student-status"
              id="student-status"
              className="form-control form-input"
              onChange={InputHandler}
            >
              <option default value="">
                Select status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* studentGender */}
          <div className="individual-form-container">
            <label htmlFor="student-gender" className="form-label">
              Gender
            </label>
            <select
              required
              name="student-gender"
              defaultValue=""
              id="student-gender"
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

          {/* studentBloodGroup */}
          <div className="individual-form-container">
            <label htmlFor="student-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              required
              name="student-blood-group"
              defaultValue=""
              id="student-blood-group"
              className="form-control form-input"
              onChange={InputHandler}
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

          {/* Student-dob */}
          <div className="individual-form-container">
            <label htmlFor="student-dob" className="form-label">
              Student DOB
            </label>
            <input
              required
              type="date"
              id="student-dob"
              defaultValue=""
              name="student-dob"
              className="form-control form-input"
              onChange={InputHandler}
            />
          </div>

          {/* student-games */}
          <div className="individual-form-container">
            <label htmlFor="student-games" className="form-label">
              Student Games
            </label>
            <input
              required
              type="text"
              id="student-games"
              name="student-games"
              defaultValue=""
              className="form-control form-input"
              placeholder="StudentGames"
              onChange={InputHandler}
            />
          </div>

          {/* studentHealthIssues */}
          <div className="individual-form-container">
            <label htmlFor="student-health-issues" className="form-label">
              Any Health Issues (nil if none)
            </label>
            <input
              required
              type="text"
              id="student-health-issues"
              name="student-health-issues"
              defaultValue=""
              className="form-control form-input"
              placeholder="Health Issues"
              onChange={InputHandler}
            />
          </div>

          {/* submitbutton */}
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
          {/* StudentName */}
          <div className="individual-form-container">
            <label htmlFor="student-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={editData["student-name"]}
              id="student-name"
              name="student-name"
              className="form-control form-input"
              placeholder="Student Name"
              onChange={EditInputHandler}
            />
          </div>

          {/* StudentContact */}
          <div className="individual-form-container">
            <label htmlFor="student-contact" className="form-label">
              Student Contact
            </label>

            <input
              type="number"
              value={editData["student-contact"]}
              id="student-contact"
              name="student-contact"
              className="form-control form-input"
              placeholder="Student Contact"
              onChange={EditInputHandler}
            />
          </div>

          {/* studentParentContact */}
          <div className="individual-form-container">
            <label htmlFor="student-parent-contact" className="form-label">
              Student's Parent's Contact
            </label>
            <input
              type="number"
              value={editData["student-parent-contact"]}
              name="student-parent-contact"
              id="student-parent-contact"
              className="form-control form-input"
              placeholder="Parent's contact"
              onChange={EditInputHandler}
            />
          </div>

          {/* FeesRenewal */}
          <div className="individual-form-container">
            <label htmlFor="student-fees-renewal" className="form-label">
              Renewal Dates
            </label>
            <input
              type="date"
              value={editData["student-fees-renewal"]}
              id="student-fees-renewal"
              name="student-fees-renewal"
              className="form-control form-input"
              onChange={EditInputHandler}
            />
          </div>

          {/* studentstatus */}
          <div className="individual-form-container">
            <label htmlFor="student-status" className="form-label">
              Student Status
            </label>
            <select
              name="student-status"
              value={editData["student-status"]}
              id="student-status"
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

          {/* studentGender */}
          <div className="individual-form-container">
            <label htmlFor="student-gender" className="form-label">
              Gender
            </label>
            <select
              name="student-gender"
              id="student-gender"
              value={editData["student-gender"]}
              className="form-control form-input"
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

          {/* studentBloodGroup */}
          <div className="individual-form-container">
            <label htmlFor="student-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              value={editData["student-blood-group"]}
              name="student-blood-group"
              id="student-blood-group"
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

          {/* Student-dob */}
          <div className="individual-form-container">
            <label htmlFor="student-dob" className="form-label">
              Student DOB
            </label>
            <input
              type="date"
              value={editData["student-dob"]}
              id="student-dob"
              name="student-dob"
              className="form-control form-input"
              onChange={EditInputHandler}
            />
          </div>

          {/* student-games */}
          <div className="individual-form-container">
            <label htmlFor="student-games" className="form-label">
              Student Games
            </label>
            <input
              type="text"
              value={editData["student-games"]}
              id="student-games"
              name="student-games"
              className="form-control form-input"
              placeholder="StudentGames"
              onChange={EditInputHandler}
            />
          </div>

          {/* studentHealthIssues */}
          <div className="individual-form-container">
            <label htmlFor="student-health-issues" className="form-label">
              Any Health Issues
            </label>
            <input
              type="text"
              value={editData["student-health-issues"]}
              id="student-health-issues"
              name="student-health-issues"
              className="form-control form-input"
              placeholder="Health Issues"
              onChange={EditInputHandler}
            />
          </div>

          {/* submitbuttons */}
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

export default StudentsDatabaseForm;
