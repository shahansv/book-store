import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Authprovider } from "./context/authCotext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="194648488540-c4gd5gf9tnqa98voa5csqo84mec0dkgu.apps.googleusercontent.com">
      <BrowserRouter>
        <Authprovider>
          <App />
        </Authprovider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
