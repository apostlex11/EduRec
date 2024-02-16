import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import HomePage from './pages/Home/home';
import ContactPage from './pages/Contact/contact';
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/contact' component={ContactPage} />
        </Switch>
      </div>
        <Footer />
    </Router>
  )
}

export default App;
