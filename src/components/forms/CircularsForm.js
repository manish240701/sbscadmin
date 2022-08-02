//dependencies
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useState, useContext, useEffect } from "react";

//components
import { EditContext } from "../../Context/EditContext";

//css
import "./Forms.css";

//code
const CircularsForm = () => {
  //states
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);
  const [editKeyword, setEditKeyword] = useState("");

  //handlers
  //searchkeywordhandler
  const searchKeywords = (key) => {
    key = key.toLowerCase();
    console.log("change ", key);
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
      await setDoc(doc(db, "circulars", id), {
        ...data,
        timeStamp: serverTimestamp(),
        searchKeywords: searchKeywords(data["circular-name"]),
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
      await setDoc(doc(db, "circulars", id), {
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
      const docRef = doc(db, "circulars", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="circulars-form-container menu6-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* circularname */}
          <div className="individual-form-container">
            <label htmlFor="circular-name" className="form-label">
              Circular Name
            </label>
            <input
              required
              defaultValue=""
              type="text"
              id="circular-name"
              name="circular-name"
              className="form-control form-input"
              placeholder="Circular Name"
              onChange={InputHandler}
            />
          </div>

          {/* circularDate */}
          <div className="individual-form-container">
            <label htmlFor="circular-date" className="form-label">
              Circular Date
            </label>
            <input
              required
              defaultValue=""
              type="date"
              id="circular-date"
              name="circular-date"
              className="form-control form-input"
              placeholder="Circular date"
              onChange={InputHandler}
            />
          </div>

          {/* circularurl */}
          <div className="individual-form-container">
            <label htmlFor="circular-url" className="form-label">
              Circular URL
            </label>
            <input
              required
              defaultValue=""
              type="url"
              id="circular-url"
              name="circular-url"
              className="form-control form-input"
              placeholder="Circular url"
              onChange={InputHandler}
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
      )}
      {isClicked && (
        <form onSubmit={EditHandler}>
          {/* circularname */}
          <div className="individual-form-container">
            <label htmlFor="circular-name" className="form-label">
              Circular Name
            </label>
            <input
              type="text"
              id="circular-name"
              name="circular-name"
              className="form-control form-input"
              placeholder="Circular Name"
              value={editData["circular-name"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* circularurl */}
          <div className="individual-form-container">
            <label htmlFor="circular-url" className="form-label">
              Circular URL
            </label>
            <input
              type="url"
              id="circular-url"
              name="circular-url"
              className="form-control form-input"
              value={editData["circular-url"]}
              placeholder="Circular url"
              onChange={EditInputHandler}
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
      )}
    </div>
  );
};

export default CircularsForm;
