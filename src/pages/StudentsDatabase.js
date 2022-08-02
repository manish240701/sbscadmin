//components
import AdminClubDetailsContainer from "../components/widgets/AdminClubDetailsContainer";
import AddButton from "../components/widgets/AddButton.js";
import StudentDatabaseTable from "../components/widgets/StudentDatabase/StudentDatabaseTable";
import Modal from "../components/widgets/Modal.js";

//css
import "./css/StudentsDatabase.css";

//code
const StudentsDatabase = () => {
  return (
    <div className="student-database-container body-top-margin">
      {/* club details container */}
      <div className="admin-club-details-container">
        <AdminClubDetailsContainer />
      </div>

      {/* students-database-table */}
      <div className="students-database-table-container">
        <StudentDatabaseTable />
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

export default StudentsDatabase;
