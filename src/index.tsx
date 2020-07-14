import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-responsive-modal/styles.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { AuthProvider } from "./providers/AuthProvider";
import { MapProvider } from "./providers/MapProvider";
import Routes from "./routes";
import { store } from "./store/index";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <MapProvider apiKey="luyZqvNrAuqyAqkEhiE35M3JyoIISoYg">
          <ToastContainer />
          <Routes />
        </MapProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
