//dependencies
import { useAuth0 } from "@auth0/auth0-react";

//components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentsDatabase from "./StudentsDatabase.js";
import CoachesDatabase from "./CoachesDatabase.js";
import Achievements from "./Achievements.js";
import AthleticHonors from "./AthleticHonors.js";
import UpcomingEvents from "./UpcomingEvents.js";
import Circulars from "./Circulars.js";
import Blogs from "./Blogs.js";
import Gallery from "./Gallery.js";
import NavBar from "../components/NavBar.js";
import AchievementDetails from "../components/widgets/Achievements/AchievementDetails.js";

//code
const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <StudentsDatabase />
          </Route>
          <Route exact path="/studentsdatabase">
            <StudentsDatabase />
          </Route>
          <Route exact path="/coachesdatabase">
            <CoachesDatabase />
          </Route>
          <Route exact path="/achievements">
            <Achievements />
          </Route>
          <Route exact path="/athletichonors">
            <AthleticHonors />
          </Route>
          <Route exact path="/upcomingevents">
            <UpcomingEvents />
          </Route>
          <Route exact path="/circulars">
            <Circulars />
          </Route>
          <Route exact path="/blogs">
            <Blogs />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/achievements/:id">
            <AchievementDetails />
          </Route>
        </Switch>
      </Router>
    )
  );
};

export default Home;
