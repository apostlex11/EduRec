import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="row">
        <a href="#"><i className="fa fa-facebook"></i></a>
        <a href="#"><i className="fa fa-instagram"></i></a>
        <a href="#"><i className="fa fa-youtube"></i></a>
        <a href="#"><i className="fa fa-twitter"></i></a>
        <a href="#"><i className="fa fa-linkedin"></i></a>
      </div>

      <div className="row">
        <ul>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Career</a></li>
        </ul>
      </div>

      <div className="row">
        Copyright © 2024 EDUREC
      </div>
    </footer>
  );
}

export default Footer;