import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import ListPlaces from './pages/ListPlaces';
import InsertPlace from './pages/InsertPlace';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <div>
      <NavBar token={ token } setToken={ setToken }/>
      <Routes>
            <Route path='/' element={<ListPlaces />}/>
            <Route path='/:username' element={<ListPlaces />}/>
            <Route path='/insert' element={<RequireAuth token={ token }><InsertPlace /></RequireAuth>}/>
            <Route path='/login' element={<RequireUnAuth token={ token }><Login setToken={ setToken }/></RequireUnAuth>}/>
            <Route path='/register' element={<RequireUnAuth token={ token }><Register setToken={ setToken }/></RequireUnAuth>}/>
            <Route path='/about' element={<About />}/>
      </Routes>
    </div>
  )
}

const RequireAuth = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

const RequireUnAuth = ({children, token}) => {
  if (token) {
    return <Navigate to="/" />
  }
  return children
}

export default App