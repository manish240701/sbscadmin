//css
import "./Forms.css";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase";
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

//code
const GalleryForm = () => {
  //states
  const [file, setFile] = useState();

  // handlers

  //uploadimagehandler
  async function uploadImage(e) {
    e.preventDefault();
    if (!file) return;
    const storageRef = ref(
      storage,
      "gallery-uploads/id" + new Date().getTime()
    );
    const response = await uploadBytes(storageRef, file);
    const filePath = response.metadata.fullPath;
    const imagesDoc = doc(db, "gallery-uploads", "images");
    const imagesData = (await getDoc(imagesDoc)).data();
    imagesData.images.push(filePath);
    await setDoc(imagesDoc, imagesData)
      .then(() => {
        setFile("");
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div className="gallery-form-container menu8-container">
      <form action="">
        {/* galleryaddimages */}
        <div className="individual-form-container">
          <label htmlFor="gallery-add-image" className="form-label">
            Image URL
          </label>
          <input
            required
            type="file"
            id="gallery-add-image"
            name="gallery-add-image"
            className="form-control gallery-form-input"
            placeholder="Image URL"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>

        {/* submit */}
        <div className="individual-form-container">
          <input
            type="submit"
            className="form-control gallery-form-input bg-primary text-white"
            value="upload"
            data-bs-dismiss="modal"
            onClick={(e) => {
              uploadImage(e);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
