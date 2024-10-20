import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/weather-app">
      <div className="md:size-3/4 mx-auto md:py-10 font-abc">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
