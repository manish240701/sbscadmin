//components
import UpcomingEventsCountDownTimer from "../components/widgets/UpcomingEvents/UpcomingEventsCountDownTimer";
import Modal from "../components/widgets/Modal";

//css
import "./css/UpcomingEvents.css";

//code
const UpcomingEvents = () => {
  return (
    <div className="upcomig-events-container">
      {/* count-down-timer-container */}
      <div className="count-down-timer-container">
        <UpcomingEventsCountDownTimer />
      </div>

      {/* modal */}
      <Modal />
    </div>
  );
};

export default UpcomingEvents;
