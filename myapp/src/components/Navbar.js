import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import React from "react";
const Navbar = ({ user }) => {
  const [cookie, , removeCookie] = useCookies();
  const login = cookie.token;
  const username = cookie.username;
  const navigate = useNavigate();
  const authLogout = () => {
    removeCookie("token");
    navigate("/");
  };

  const goBack = () => {
    navigate("/");
  };
  return (
    <header className="navbar flex justify-between items-center mb-4">
      <div className="navbar-logo">
        <img src="" alt="Logo" className="logo-image" />
      </div>
      <button onClick={goBack} className="navbar-button" title="Home">
        <FontAwesomeIcon icon={faHome} />
      </button>
      {!login && (
        <>
          <Link to="/login">
            <button className="navbar-button" title="Login">
              <FontAwesomeIcon icon={faUser} /> Login
            </button>
          </Link>
          <Link to="/register">
            <button className="navbar-button" title="Register">
              <FontAwesomeIcon icon={faUser} /> Register
            </button>
          </Link>
        </>
      )}
      {login && username && (
        <>
          <Link to="/me">
            <button className="navbar-button" title="Profile">
              <FontAwesomeIcon icon={faUser} /> {username}
            </button>
          </Link>
          <button className="navbar-button" onClick={authLogout} title="Logout">
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
        </>
      )}
    </header>
  );
};

export default Navbar;
