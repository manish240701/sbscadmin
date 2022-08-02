//dependencies
import { useEffect, useState } from "react";
import StudentsDatabaseForm from "../forms/StudentsDatabaseForm";
import CoachesDatabaseForm from "../forms/CoachesDatabaseForm";
import AchievementsDatabaseForm from "../forms/AchievementsForm";
import AthleticHonorsForm from "../forms/AthleticHonorsForm";
import CircularsForm from "../forms/CircularsForm";
import GalleryForm from "../forms/GalleryForm";
import BlogsForm from "../forms/BlogsForm";
import UpcomingEventsForm from "../forms/UpcomingEventsForm";
import { useLocation } from "react-router-dom";

//css
import "./Modal.css";
import AchievementsForm from "../forms/AchievementsForm";

//code
const Modal = () => {
  //states
  const modalLocation = useLocation();
  const [modalHead, setModalHead] = useState("");
  const [form, setForm] = useState("");

  useEffect(() => {
    if (modalLocation.pathname === "/") {
      setModalHead("Student Database");
      setForm(<StudentsDatabaseForm />);
    } else if (modalLocation.pathname === "/studentsdatabase") {
      setModalHead("Student Database");
      setForm(<StudentsDatabaseForm />);
    } else if (modalLocation.pathname === "/coachesdatabase") {
      setModalHead("Coaches Database");
      setForm(<CoachesDatabaseForm />);
      console.log(modalLocation.pathname);
    } else if (modalLocation.pathname === "/achievements") {
      setModalHead("Achievements Database");
      setForm(<AchievementsDatabaseForm />);
      console.log(modalLocation.pathname);
    } else if (modalLocation.pathname === "/athletichonors") {
      setModalHead("Athletic Honors Database");
      setForm(<AthleticHonorsForm />);
      console.log(modalLocation.pathname);
    } else if (modalLocation.pathname === "/upcomingevents") {
      setModalHead("Upcoming Events Database");
      setForm(<UpcomingEventsForm />);
    } else if (modalLocation.pathname === "/circulars") {
      setModalHead("Circulars Database");
      setForm(<CircularsForm />);
    } else if (modalLocation.pathname === "/blogs") {
      setModalHead("Blogs Database");
      setForm(<BlogsForm />);
    } else if (modalLocation.pathname === "/gallery") {
      setModalHead("Gallery Database");
      setForm(<GalleryForm />);
    } else if (modalLocation.pathname === "/achievements/throwball") {
      setModalHead("Throwball Achievement");
      setForm(<AchievementsForm />);
    } else if (modalLocation.pathname === "/achievements/volleyball") {
      setModalHead("Volleyball Achievement");
      setForm(<AchievementsForm />);
    }
    console.log(modalHead);
  }, [modalLocation.pathname, modalHead]);

  return (
    // display modal
    <div className="modal-container">
      <div className="modal fade" id="addEditModal" tabIndex="-1">
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header text-center d-block">
              <h5 className="modal-title">{modalHead}</h5>
            </div>
            <div className="modal-body">{form}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
