// Login.jsx

import React from 'react';
import {Link} from 'react-router-dom'
import './login.css';

const Login = () => {
  return (
    <div>
      <h1>Log in</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
        />

        <button type="submit">Login</button>
      </form>

      <p> Don't have an account? <Link to='/signup'>Signup</Link></p>
    </div>
  );
};

export default Login;
