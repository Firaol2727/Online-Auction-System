import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          {/* <img src="air.jpg" alt="images_place" /> */}
          <img
            alt="Home Page"
            src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
            style={{ width: "40px", margin: "10px 15px " }}
          ></img>
          <h6 className="brand"> NU CHARETA</h6>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img className="navMore" src="./navMore.jpg" alt="images_place" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/" className="liWords" style={{ fontSize: "17px" }}>
                <img className="navImages" src="./navHome.jpg" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="liWords"
                style={{ fontSize: "17px" }}
              >
                <img className="navImages" src="./navRegister.jpg" />
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="liWords"
                style={{ fontSize: "17px" }}
              >
                <img className="navImages" src="./navLogin.jpg" />
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
