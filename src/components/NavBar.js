//dependencies
import { Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
//css
import "./NavBar.css";
import "../pages/css/App.css";

//code
const NavBar = () => {
  //states
  const { logout, isAuthenticated } = useAuth0();
  const [activeTab, setActiveTab] = useState("/");
  const location = useLocation();

  useEffect(() => {
    //set path
    if (location.pathname === "/") setActiveTab("/studentsdatabase");
    else if (location.pathname === "/studentsdatabase")
      setActiveTab("/studentsdatabase");
    else if (location.pathname === "/coachesdatabase")
      setActiveTab("/coachesdatabase");
    else if (location.pathname === "/achievements")
      setActiveTab("/achievements");
    else if (location.pathname === "/athletichonors")
      setActiveTab("/athletichonors");
    else if (location.pathname === "/upcomingevents")
      setActiveTab("/upcomingevents");
    else if (location.pathname === "/circulars") setActiveTab("/circulars");
    else if (location.pathname === "/blogs") setActiveTab("/blogs");
    else if (location.pathname === "/gallery") setActiveTab("/gallery");
  }, [location]);

  return (
    //navbar
    isAuthenticated && (
      <Route>
        <nav className="custom-admin-navbar navbar navbar-dark fixed-top ">
          <div className="container-fluid">
            <button
              className="custom-navbar-toggle navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#admin-navbar"
              aria-controls="offcanvasWithBothOptions"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="custom-admin-navbar-toggler-icon navbar-toggler-icon"></span>
            </button>
            <span className="admin-greeting me-3">Welcome, Admin</span>
          </div>
        </nav>

        <div
          className="admin-offcanvas offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex="-1"
          id="admin-navbar"
          aria-labelledby="admin-navbar-label"
          aria-controls="offcanvasWithBothOptions"
        >
          <div className="admin-offcanvas-body offcanvas-body mt-5">
            <ul className="admin-navbar-unordered-list">
              <Link
                to="/studentsdatabase"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/studentsdatabase"
                      ? "admin-navbar-list active"
                      : " admin-navbar-list "
                  }`}
                  onClick={() => setActiveTab("/studentsdatabase")}
                >
                  Students Database
                </li>
              </Link>
              <Link
                to="/coachesdatabase"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/coachesdatabase"
                      ? "active green admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/coachesdatabase")}
                >
                  Coaches Database
                </li>
              </Link>
              <Link
                to="/achievements"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/achievements"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/achievements")}
                >
                  Achievements
                </li>
              </Link>
              <Link
                to="athletichonors"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/athletichonors"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/athletichonors")}
                >
                  Athletic honors
                </li>
              </Link>
              <Link
                to="upcomingevents"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/upcomingevents"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/upcomingevents")}
                >
                  Upcoming Events
                </li>
              </Link>
              <Link
                to="circulars"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/circulars"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/circulars")}
                >
                  Circulars
                </li>
              </Link>
              <Link
                to="blogs"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/blogs"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/blogs")}
                >
                  Blogs
                </li>
              </Link>
              <Link
                to="gallery"
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <li
                  className={`${
                    activeTab === "/gallery"
                      ? "active admin-navbar-list"
                      : "admin-navbar-list"
                  }`}
                  onClick={() => setActiveTab("/gallery")}
                >
                  Gallery
                </li>
              </Link>
              <Link
                to=""
                data-bs-dismiss="offcanvas"
                className="admin-navbar-link"
              >
                <button className="admin-logout-btn" onClick={() => logout()}>
                  Log out
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </Route>
    )
  );
};

export default NavBar;
