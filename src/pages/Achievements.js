//components
import AchievementsIndividualContainer from "../components/widgets/Achievements/AchievementsIndividualContainer";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/Achievements.css";
import "../components/widgets/Table.css";

//code
const Achievements = () => {
  return (
    <div className="achievements-conatainer mt-5">
      {/* achievements row */}
      <div className="achievements-container-row">
        <AchievementsIndividualContainer />
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

export default Achievements;
