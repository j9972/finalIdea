import "./CSSFILE/App.css";
import "./CSSFILE/registration.css";
import "./CSSFILE/tripHome.css";
import "./pages/Searching.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./pages/Registration";
import TripHome from "./pages/tripHome";
import Login from "./pages/Login";
import Searching from "./pages/Searching";
import NaverMap from "./pages/NaverMap";

function App() {
  return (
    <div className="App">
      <p>hi</p>
      <Router>
        <Routes>
          <Route path="/home" exact component={TripHome} />
          <Route path="/Registration" exact component={Registration} />
          <Route path="/Login" exact component={Login} />
          <Route path="/searching" exact component={Searching} />
          <Route path="/map" exact component={NaverMap} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
