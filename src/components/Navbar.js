import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { HomeButton } from "./HomeButton";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            The Workout App <i className="fas fa-dumbbell"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/exercises"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Exercises
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                Cart
              </Link>
            </li>
            <li className="nav-item">
                  <Link to="/sign-in" className="nav-links" onClick={closeMobileMenu}>Sign In</Link>
            </li>
          </ul>
          {button && (
            <HomeButton buttonStyle="btn--outline">SIGN IN</HomeButton>
          )}
        </div>
        {/* <h1>The Workout App</h1> */}
        <Link to="/">Dasboard</Link>
        <Link to="auth">Auth</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </>
  );
}

export default Navbar;
