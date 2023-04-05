// import { useState } from "react";
// import "./NavBar.css";
// import { NavLink } from "react-router-dom";

// function NavBar() {
//   const [isNavExpanded, setIsNavExpanded] = useState(false);
//   return (
//     // <div>
//     //   <div className="nav">
//     //     <div className="logoImage">
//     //       <img src="air.jpg" alt="images_place" />
//     //     </div>
//     //     <div className="navright">
//     //       <NavLink
//     //         to="/about"
//     //         style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
//     //       >
//     //         About
//     //       </NavLink>
//     //       <NavLink
//     //         to="/contactus"
//     //         style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
//     //       >
//     //         Contact Us
//     //       </NavLink>

//     //       <NavLink
//     //         to="/register"
//     //         style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
//     //       >
//     //         Signup
//     //       </NavLink>

//     //       <NavLink
//     //         to="/login"
//     //         style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
//     //       >
//     //         Login
//     //       </NavLink>
//     //     </div>
//     //   </div>
//     //   <hr />
//     // </div>

//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">

//         </div>
//         <div className="menu-icon" onClick={handleShowNavbar}>
//           <Hamburger />
//         </div>
//         <div className={`nav-elements  ${showNavbar && "active"}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>

//             <li>
//               <NavLink to="/about">About</NavLink>
//             </li>
//             <li>
//               <NavLink to="/contact">Contact</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );

// }
// export default NavBar;

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
          <img className="navMore" src="navMore.jpg" alt="images_place" />
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
