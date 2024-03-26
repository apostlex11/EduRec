import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './navbar.css';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <a href='#home' className="logo">EduRec </a>
          <ul className={`navMenu ${isActive ? 'active' : ''}`}>
            <li onClick={removeActive}>
              <a href='/' className="navLink">Home</a>
            </li>
            <li onClick={removeActive}>
              <a href='/about-us' className="navLink">About Us</a>
            </li>
            <li onClick={removeActive}>
              <a href='/contact' className="navLink">Contact</a>
            </li>
            <li onClick={removeActive}>
              <a href='/login' className="navLink2">Log-In</a>
            </li>
          </ul>
          <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
