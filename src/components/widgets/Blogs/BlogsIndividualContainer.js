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
import "./BlogsIndividualContainer.css";
import UseImages from "../../UseImages";

//code
const BlogsIndividualContainer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const [coverImagesData, setCoverImagesData] = useState([]);
  const [containerImagesData, setContainerImagesData] = useState([]);
  const coverImages = UseImages(coverImagesData);
  const containerImages = UseImages(containerImagesData);
  const [tempData, setTempData] = useState();

  //handlers

  //deletehandler
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "blogs", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
        let list = [];
        let coverImageUrl = [];
        let containerImageUrl = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          if (doc.data().coverurl) coverImageUrl.push(doc.data().coverurl);
          if (doc.data().containerurl)
            containerImageUrl.push(doc.data().containerurl);
        });
        setData(list);
        setTempData(list);
        setCoverImagesData(coverImageUrl);
        setContainerImagesData(containerImageUrl);
        console.log(coverImageUrl);
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
        collection(db, "blogs"),
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
          placeholder="Search for blogs..."
          setValue={(value) => filterHandler(value)}
        />
      </div>

      {/* displaydata */}
      {data
        .slice(0)
        .reverse()
        .map((d) => (
          <div className="blogs-individual-container" key={d.timeStamp}>
            <img
              className="blogs-image"
              src={containerImages[d.containerurl]}
              alt="blog-individual-image"
              width="100%"
            />

            <h4 className=" blogs-title green mt-3">{d["blog-title"]}</h4>
            <p className="blogs-created-date">24/07/2001</p>

            <button
              className="admin-edit-btn"
              data-toggle="modal"
              data-target="#modal-fullscreen-xl"
              data-bs-toggle="modal"
              data-bs-target="#addEditModal"
              onClick={() => EditHandler(d.id)}
            >
              Edit
            </button>
            <button
              className="admin-delete-btn"
              data-bs-toggle="modal"
              data-bs-target="#delete -modal"
              onClick={() => DeleteHandler(d.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </>
  );
};

export default BlogsIndividualContainer;
