//dependencies
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";

//components
import App from "./pages/App";
import { EditContextProvider } from "./Context/EditContext";

//code

//authentication
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <EditContextProvider>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </EditContextProvider>,
  document.getElementById("root")
);
