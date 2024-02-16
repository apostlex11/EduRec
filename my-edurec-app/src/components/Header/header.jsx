import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      {/* Branding/Logo */}
      <div className="logo">Your Logo</div>
      
      {/* Navigation Bar */}
      <Navbar />
    </header>
  );
};

export default Header;
