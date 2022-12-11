import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import NavBar from './components/NavBar';
import ListPlaces from './pages/ListPlaces';
import InsertPlace from './pages/InsertPlace';

const App = () => {
  return (
    <div>
      <NavBar />

      <Routes>
            <Route path='/' element={<ListPlaces />}/>
            <Route path='/insert' element={<InsertPlace />}/>
      </Routes>
    </div>
  )
}

export default App