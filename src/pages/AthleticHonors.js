//components
import AthleticHonorsIndividualContainer from "../components/widgets/athleticHonors/AthleticHonorsIndividualContainer";
import SearchBar from "../components/widgets/SearchBar.js";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/AthleticHonors.css";

//code
const AthleticHonors = () => {
  return (
    <div className="athletic-honors-container">
      {/* athletic-honors-row */}
      <div className="athletic-honors-row">
        <AthleticHonorsIndividualContainer />
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

export default AthleticHonors;
