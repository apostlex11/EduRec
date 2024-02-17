import React from 'react';
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
        />

        <button type="submit">Sign Up</button>
      </form>

      <p> Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  );
};

export default Signup;
