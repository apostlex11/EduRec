import React from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/teachers">Teachers</Link></li>
          <li><Link to="/students">Students</Link></li>
          <li><Link to="/alerts">Alerts</Link></li>
          <li><Link to="/messages">Message</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftNav;
