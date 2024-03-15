import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="md:size-3/4 mx-auto md:py-10 font-abc">
      <App />
    </div>
  </React.StrictMode>
);
