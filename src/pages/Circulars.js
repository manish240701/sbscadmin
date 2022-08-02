//components
import CircularsIndividualContainer from "../components/widgets/Circulars/CircularsIndividualContainer";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/Circulars.css";

//code
const Circulars = () => {
  return (
    <div className="circulars-container mt-5">
      {/* circulars-row */}
      <div className="circulars-container-row">
        <CircularsIndividualContainer />
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

export default Circulars;
