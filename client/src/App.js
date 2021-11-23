import "./CSSFILE/App.css";
import "./CSSFILE/registration.css";
import "./CSSFILE/tripHome.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Home from "./pages/Home";
import Registration from "./pages/Registration";
import TripHome from "./pages/tripHome";
// temp feature 개발 완료
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" exact component={TripHome} />
          <Route path="/Registration" exact component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
