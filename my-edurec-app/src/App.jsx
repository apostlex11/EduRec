import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/footer';
import HomePage from './pages/Home/home';
import ContactPage from './pages/Contact/contact.jsx';
import Login from './pages/Login/login.jsx';
import Signup from './pages/Signup/signup.jsx';
import Navbar from './components/Navbar/navbar.jsx';
import adminDashboard from './pages/Dashboard/adminDashboard.jsx';
import teacherDashboard from './pages/Dashboard/teacherDashboard.jsx';
import parentDashboard from './pages/Dashboard/parentDashboard.jsx';
import studentDashboard from './pages/Dashboard/studentDashboard.jsx';
import './App.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <ApolloProvider client={client}>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path="/admin-dashboard" element={renderProtectedRoute('admin', isAuthenticated, userRole, <adminDashboard />)} />
          <Route path="/teacher-dashboard" element={renderProtectedRoute('teacher', isAuthenticated, userRole, <teacherDashboard />)} />
          <Route path="/parent-dashboard" element={renderProtectedRoute('parent', isAuthenticated, userRole, <parentDashboard />)} />
          <Route path="/student-dashboard" element={renderProtectedRoute('student', isAuthenticated, userRole, <studentDashboard />)} />
          {/* <ProtectedRoute path="/admin-dashboard" role="admin" isAuthenticated={isAuthenticated} component={adminDashboard} />
        <ProtectedRoute path="/teacher-dashboard" role="teacher" isAuthenticated={isAuthenticated} component={teacherDashboard} />
        <ProtectedRoute path="/parent-dashboard" role="parent" isAuthenticated={isAuthenticated} component={parentDashboard} />
      <ProtectedRoute path="/student-dashboard" role="student" isAuthenticated={isAuthenticated} component={studentDashboard} /> */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  )
}

// const ProtectedRoute = ({ component: Component, isAuthenticated, role, userRole, ...rest }) => (
//   const navigateTo = useNavigate();
//   <Route
//     {...rest}
//     render={(props) => {
//       if (isAuthenticated) {
//         if (userRole === role) {
//           return <Component {...props} />;
//         } else {
//           // return <Redirect to={`/${userRole}-dashboard`} />;
//           return navigateTo(`/${userRole}-dashboard`);
//         }
//       } else {
//         // return <Redirect to="/login" />;
//         return navigateTo('/login');
//       }
//     }}
//   />
// );


// const ProtectedRoute = ({ component: Component, isAuthenticated, role, userRole, ...rest }) => {
//   const navigateTo = useNavigate();

//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated ? (
//           userRole === role ? (
//             <Component />
//           ) : (
//             navigateTo(`/${userRole}-dashboard`)
//           )
//         ) : (
//           navigateTo('/login')
//         )
//       }
//     />
//   );
// };
function renderProtectedRoute(role, isAuthenticated, userRole, component) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to={`/${userRole}-dashboard`} />;
  }

  return component;
}

export default App;
