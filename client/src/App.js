import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import NavBar from './components/NavBar';
import ListPlaces from './pages/ListPlaces';
import InsertPlace from './pages/InsertPlace';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
            <Route path='/' element={<ListPlaces />}/>
            <Route path='/insert' element={<InsertPlace />}/>
            <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App