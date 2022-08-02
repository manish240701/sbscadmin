//depenencies
import { Route, Link } from "react-router-dom";

//css
import "./AchievementsIndividualContainer.css";

//code
const AchievementsIndividualContainer = () => {
  //handlers

  return (
    <Route>
      {/* display games */}
      <div className="achievements-row ">
        <div className="achievements-individual-container">
          <Link to="/achievements/throwball">
            <div className="achievements-individual achievements-throwball text-white p-5">
              Throwball
            </div>
          </Link>
        </div>

        <div className="achievements-individual-container">
          <Link to="/achievements/volleyball">
            <div className="achievements-individual achievements-throwball text-white p-5">
              VolleyBall
            </div>
          </Link>
        </div>

      </div>
    </Route>
  );
};

export default AchievementsIndividualContainer;
