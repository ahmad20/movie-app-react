import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import logo from "../assets/logo.png"

const Navbar = () => {
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
    <header className="flex justify-between items-center mb-4">
      <div onClick={goBack}>
        <img src={logo} alt="Logo" className="logo-image w-10 cursor-pointer"/>
      </div>
      <div>
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
            <button
              className="navbar-button"
              onClick={authLogout}
              title="Logout"
            >
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
