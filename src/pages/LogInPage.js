//dependencies
import { useAuth0 } from "@auth0/auth0-react";

//css
import "./css/LogInPage.css";
//code
const LogInPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="login-page-container text-center">
        <div className="login-page-container-content">
          <h1 className="white login-page-title mb-3">
            SUBRAMANIA BHARATHI SPORTS CLUB
          </h1>
          <hr style={{ width: "40%", color: "#2196f3", margin: "0 auto" }} />
          <button
            className="login-btn mt-4"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      </div>
    )
  );
};

export default LogInPage;
