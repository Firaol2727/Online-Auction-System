import { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div className="nav">
        <div className="logoImage">
          <img src="air.jpg" alt="images_place" />
        </div>
        <div className="navright">
          <NavLink
            to="/about"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            About
          </NavLink>
          <NavLink
            to="/contactus"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Contact Us
          </NavLink>

          <NavLink
            to="/register"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Signup
          </NavLink>

          <NavLink
            to="/login"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Login
          </NavLink>
        </div>
      </div>
      <hr />
    </div>
  );
}
export default NavBar;
