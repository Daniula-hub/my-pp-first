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
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu} >
          <i className="fas fa-dumbbell"></i> The Workout App  
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
                      <Link to="/yourpicks" className="nav-links" onClick={closeMobileMenu}>
                        Your Picks
                      </Link>
                    </li> 
            : null}
            {user ? <li className="nav-item">
                      <Link to="/programs" className="nav-links" onClick={closeMobileMenu}>
                        Programs
                      </Link>
                    </li> 
            : null}
            {user ? <li className="nav-item">
                      <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                        Cart
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
