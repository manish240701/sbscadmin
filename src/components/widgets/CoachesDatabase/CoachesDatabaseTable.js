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
import "../Table.css";

//code
const CoachesDatabaseTable = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "coaches"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTempData(list);
        setData(list);
        dispatch({ type: "CLICKED" });
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, []);

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  //filters
  const filterHandler = async (value) => {
    if (value.length > 0) {
      const q = query(
        collection(db, "coaches"),
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
      <SearchBar
        placeholder="Search..."
        setValue={(value) => filterHandler(value)}
      />

      {/* display data */}
      <div className="coaches-database-table-container mt-5">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Games</th>
              <th scope="col">Experience</th>
              <th scope="col">Achievements</th>
              <th scope="col">Status</th>
              <th scope="col">Contact</th>
              <th scope="col">Gender</th>
              <th scope="col">Blood Group</th>
            </tr>
          </thead>
          {data
            .slice(0)
            .reverse()
            .map((d) => (
              <tbody>
                <tr className="table-row" key={d.timeStamp}>
                  <td>
                    <a
                      href=""
                      data-toggle="modal"
                      data-target="#modal-fullscreen-xl"
                      data-bs-toggle="modal"
                      data-bs-target="#addEditModal"
                      onClick={() => EditHandler(d.id)}
                    >
                      <i className="table-edit-icon fa-solid fa-pen"></i>
                    </a>
                  </td>
                  <td>{d["coach_id"]}</td>
                  <td>{d["coach-name"]}</td>
                  <td>{d["coach-game"]}</td>
                  <td>{d["coach-experience"]}</td>
                  <td>{d["coach-achievements"]} </td>
                  <td>{d["coach-status"]}</td>
                  <td>{d["coach-contact"]}</td>
                  <td>{d["coach-gender"]}</td>
                  <td>{d["coach-blood-group"]}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
};

export default CoachesDatabaseTable;
