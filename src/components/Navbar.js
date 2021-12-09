import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthButton } from "./buttons/AuthButton";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { user } = useSelector((store) => store.auth);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
  
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/home" className="navbar-logo" onClick={closeMobileMenu} >
          <i className="fas fa-dumbbell"></i> <h2>The Workout App</h2>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/exercises" className="nav-links" onClick={closeMobileMenu}>
                Exercises
              </Link>
            </li>
            {user ? <li className="nav-item">
                      <Link to="/yourExercises" className="nav-links" onClick={closeMobileMenu}>
                        Your Chosen Exercises
                      </Link>
                    </li> 
            : null}
            {user ? <li className="nav-item">
                      <Link to="/programs" className="nav-links" onClick={closeMobileMenu}>
                        Programs
                      </Link>
                    </li> 
            : null}
            <li>
              <Link
                to='/auth'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          {button && (
            <AuthButton buttonStyle="btn--outline">SIGN IN</AuthButton>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
