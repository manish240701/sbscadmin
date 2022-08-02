//components
import GalleryContainer from "../components/widgets/Gallery/GalleryContainer.js";
import SearchBar from "../components/widgets/SearchBar.js";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/Gallery.css";

//code
const Gallery = () => {
  return (
    <div className="gallery-container">
      {/* gallery-container */}
      <div className="gallery-container-row">
        <GalleryContainer />
      </div>

      {/* modal */}
      <Modal />
      <div
        className="global-add-btn"
        data-toggle="modal"
        data-target="#modal-fullscreen-xl"
        data-bs-toggle="modal"
        data-bs-target="#addEditModal"
      >
        <AddButton />
      </div>
    </div>
  );
};

export default Gallery;
