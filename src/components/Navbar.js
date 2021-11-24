import {Link} from 'react-router-dom';
import React, { useState } from 'react';


function Navbar () {
    const [click, setClick] = useState(false);
    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                    The Workout App <i className='fab fa-typo3' />
                </Link>
                <div className='menu-icon'>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

                    </div>
            </div>
        <h1>The Workout App</h1>
        <Link to='/'>Dasboard</Link>
        <Link to='auth'>Auth</Link>
        <Link to='/exercises'>Exercises</Link>
        <Link to='/cart'>Cart</Link>
       
        </nav>
        
        </>
    )
}

export default Navbar;