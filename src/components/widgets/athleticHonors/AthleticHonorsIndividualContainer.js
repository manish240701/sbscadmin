//dependencies
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";

//components
import { EditContext } from "../../../Context/EditContext";
import SearchBar from "../SearchBar";

//css
import "./AthleticHonorsIndividualContainer.css";
import UseImages from "../../UseImages";

//code
const AthleticHonorsIndividualContainer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const [imagesData, setImagesData] = useState([]);
  const images = UseImages(imagesData);
  const [tempData, setTempData] = useState([]);

  //handlers

  //deletehandler
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "athletichonors", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "athletichonors"), (snapShot) => {
        let list = [];
        let imageurl = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          if (doc.data().imageurl) imageurl.push(doc.data().imageurl);
        });
        setData(list);
        setTempData(list);
        setImagesData(imageurl);
        dispatch({ type: "CLICKED" });
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, []);

  //filters
  const filterHandler = async (value) => {
    if (value.length > 0) {
      const q = query(
        collection(db, "athletichonors"),
        where("searchKeywords", "array-contains", value)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
    if (value.length <= 0) {
      setData(tempData);
    }
  };

  return (
    <>
      {/* searchbar */}
      <div className="global-search-filter">
        <SearchBar
          placeholder="Search for athletes..."
          setValue={(value) => filterHandler(value)}
        />
      </div>
      {/* display data */}
      {data
        .slice(0)
        .reverse()
        .map((d) => (
          <div
            className="athletic-honors-individual-container"
            key={d.timeStamp}
          >
            {/* athlete-image */}
            <div className="athletic-honors-athlete-image">
              <img src={images[d.imageurl]} width="100%" />
            </div>

            {/* athlete-name */}
            <div className="athletic-honors-athlete-name">
              <h3 className="athlete-name green mt-3">{d["athlete-name"]}</h3>
            </div>
            {/*Athlete achievement*/}
            <div className="athletic-honors-achievements-details">
              {/* event name */}
              <div className="athletic-honors-event-name">
                <p className="athlete-event-name">
                  {d["athlete-achievement-event-details"]}
                </p>
              </div>

              {/*event prize */}
              <div className="athletic-honors-event-prize">
                <p className="athlete-event-prize">
                  {d["athlete-achievement-prize-details"]}
                </p>
              </div>
            </div>

            <div className="athletic-honors-buttons">
              <button
                className="atheleticHonors-edit-button admin-edit-btn me-2"
                data-toggle="modal"
                data-target="#modal-fullscreen-xl"
                data-bs-toggle="modal"
                data-bs-target="#addEditModal"
                onClick={() => EditHandler(d.id)}
              >
                Edit
              </button>
              <button
                className="atheleticHonors-delete-button admin-delete-btn"
                data-bs-toggle="modal"
                data-bs-target="#delete- modal"
                onClick={() => DeleteHandler(d.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AthleticHonorsIndividualContainer;
