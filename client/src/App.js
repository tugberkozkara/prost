import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import ListPlaces from './pages/ListPlaces';
import InsertPlace from './pages/InsertPlace';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <NavBar user={ user } setUser={ setUser }/>
      <Routes>
            <Route path='/' element={<ListPlaces />}/>
            <Route path='/insert' element={<RequireAuth user={ user }><InsertPlace /></RequireAuth>}/>
            <Route path='/login' element={<Login setUser={ setUser }/>}/>
            <Route path='/register' element={<Register setUser={ setUser }/>}/>
      </Routes>
    </div>
  )
}

const RequireAuth = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default App