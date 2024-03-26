import React, { useState } from 'react';
// import {Link} from 'react-router-dom'
import AuthService from '../../utils/auth';
import './login.css';
import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      AuthService.login(data.login.token);
      if (localStorage.getItem('email') !== null) {
        localStorage.removeItem('email');
        localStorage.setItem('email', formState.email);
      } else {
        localStorage.setItem('email', formState.email);
      }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input
          type={'email'}
          name={'email'}
          placeholder={'Email'}
          onChange={handleInputChange}
        />
        <input
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          onChange={handleInputChange}
        />
        <button type={'submit'} onClick={handleFormSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [login, {error, data}] = useMutation(LOGIN_USER);
  
//   const handleLogin = async() => {
//     try {
//       const response = await fetch(`http://localhost:<port>/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password})
//       });

//       if(!response.ok) {
//         throw new Error('invalid credentials');
//       }

//       const { token, role } = await response.json();

//       if (role === 'admin') {
//         //render admin dash
//       } else if (role === 'teacher') {
//         //render teacher dash
//       } else if (role === 'student') {
//         //render student dash 
//       } else if (role === 'parent') {
//         //render parent dash
//       }
//     } catch (error) {
//       console.log('Login failed:', error.message);
//     }
//   };


//   return (
//     <div>
//       <h1>Log in</h1>
//       <form>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           onChange={(e) =>
//             setUsername(e.target.value)}
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           onChange={(e) =>
//             setPassword(e.target.value)}
//         />

//         <button type="submit" onClick={handleLogin}>Login</button>
//       </form>

//       <p> Don't have an account? <Link to='/signup'>Signup</Link></p>
//     </div>
//   );
// };

export default Login;
