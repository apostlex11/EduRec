// Login.jsx

import React, { useState } from 'react';
import bcrypt from 'bcrypt';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate fetching user data from a server or database
    const userData = {
      username: 'exampleUser',
      // Replace this hashed password with the actual hashed password stored in the database
      password: '$2b$10$MYHgkxMFcB/Dpg//BnfHm./DfuoQ60RRS06zJ0WZi/l6S7w9LsJPe',
    };

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(formData.password, userData.password);

    if (passwordMatch) {
      console.log('Login successful!');
      // You can redirect or perform additional actions upon successful login
    } else {
      console.log('Invalid username or password');
      // You can display an error message to the user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
