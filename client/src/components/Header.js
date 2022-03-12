// 이 부분은 지금 사용한건 아니고
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = ({ authState, setAuthState }) => {
  const history = useHistory();
  const logout = (data) => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    history.push("/login");
  };
  return (
    <div className="navbar">
      <div className="links">
        {!authState.status ? (
          <>
            <Link to="/login"> Login</Link>
            <Link to="/registration"> Registration</Link>
          </>
        ) : (
          <>
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> Create A Post</Link>
          </>
        )}
      </div>
      <div className="loggedInContainer">
        <h1>{authState.username} </h1>
        {authState.status && <button onClick={logout}> Logout</button>}
      </div>
    </div>
  );
};

export default Header;
