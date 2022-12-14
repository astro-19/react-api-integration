import React from 'react';
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import ViewData from './Components/ViewData';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
          <Route path='view' element={<ViewData />}></Route>
      </Route>
    </Routes>
  )
}

export default App
