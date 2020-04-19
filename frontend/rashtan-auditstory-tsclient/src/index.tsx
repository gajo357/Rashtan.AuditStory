import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./services/AuthService";
import ApiService from "./services/ApiService";
// import MockedApiService from "./services/MockedApiService";

const authService = new AuthService();
const apiService = new ApiService(authService);

ReactDOM.render(
  <BrowserRouter>
    <App authService={authService} apiService={apiService} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
