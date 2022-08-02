//dependencies
import { db } from "../../../Firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

//components
import UseImages from "../../UseImages";

//css
import "./GalleryContainer.css";

//code
const GalleryContainer = () => {
  //states
  const [imagesData, setImagesData] = useState([]);
  const images = UseImages(imagesData);
  const imageDoc = doc(db, "gallery-uploads", "images");

  //handlers
  useEffect(() => {
    let unsub = onSnapshot(imageDoc, (snap) => {
      setImagesData(snap.data().images);
    });

    return () => unsub();
  }, []);

  //deleteimagehandler
  async function deleteImage(e, image) {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      e.preventDefault();
      let index = imagesData.indexOf(image);

      let newImages = [
        ...imagesData.slice(0, index),
        ...imagesData.slice(index + 1),
      ];

      await updateDoc(imageDoc, { images: newImages });

      delete images[imagesData[index]];
      setImagesData(newImages);
    }
  }

  return (
    <div className="gallery-container mt-5  ">
      {/* imagedisplay */}
      {Object.keys(images).map((img) => {
        return img == "loading" ? (
          "Loading"
        ) : img == -1 ? (
          "File not found"
        ) : (
          <div className="text-center mt-4 d-flex gallery-individual-container">
            <img className="  " src={images[img]} width="80%" />
            <button
              className="admin-delete-btn mt-2"
              onClick={(e) => deleteImage(e, img)}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryContainer;
