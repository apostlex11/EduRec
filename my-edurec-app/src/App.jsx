import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/header.jsx';
import Footer from './components/Footer/footer';
import HomePage from './pages/Home/home';
import ContactPage from './pages/Contact/contact.jsx';
import Login from './pages/Login/login.jsx';
import Signup from './pages/Signup/signup.jsx';

import './App.css'

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/contact' element={<ContactPage/>} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App;
