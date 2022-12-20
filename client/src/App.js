import React, { useState, useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom';

import NavBar from './components/NavBar';
import ListPlaces from './pages/ListPlaces';
import InsertPlace from './pages/InsertPlace';
import Login from './pages/Login';

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div>
      <NavBar user={ user } setUser={ setUser }/>
      <Routes>
            <Route path='/' element={<ListPlaces />}/>
            <Route path='/insert' element={<InsertPlace />}/>
            <Route path='/login' element={<Login setUser={ setUser }/>}/>
      </Routes>
    </div>
  )
}

export default App