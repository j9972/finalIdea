import "./CSSFILE/App.css";
import "./CSSFILE/registration.css";
import "./CSSFILE/tripHome.css";
import "./pages/Searching.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./pages/Registration";
import TripHome from "./pages/tripHome";
import Login from "./pages/Login";
import Searching from "./pages/Searching";
import NaverMap from "./pages/NaverMap";

function App() {
  const [appSiteInfo, setAppSiteInfo] = useState([]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<TripHome />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/searching"
            element={
              <Searching
                appSiteInfo={appSiteInfo}
                setAppSiteInfo={setAppSiteInfo}
              />
            }
          />
          <Route
            path="/map"
            element={
              <NaverMap
                appSiteInfo={appSiteInfo}
                setAppSiteInfo={setAppSiteInfo}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
