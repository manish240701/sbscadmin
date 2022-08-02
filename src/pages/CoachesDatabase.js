//components
import AdminClubDetailsContainer from "../components/widgets/AdminClubDetailsContainer";
import SearchBar from "../components/widgets/SearchBar";
import CoachesDatabaseTable from "../components/widgets/CoachesDatabase/CoachesDatabaseTable";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/CoachesDatabase.css";

//code
const CoachesDatabase = () => {
  return (
    <div className="coaches-database-container">
      {/* club details container */}
      <div className="admin-club-details-container">
        <AdminClubDetailsContainer />
      </div>

      {/* coaches database tables */}
      <div className="coaches-database-table-container">
        <CoachesDatabaseTable />
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

export default CoachesDatabase;
