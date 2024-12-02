import React from 'react';
import Home from './Components/Pages/Home';
import { Route, Routes } from 'react-router-dom';
import SeriesL2 from './Components/Pages/SeriesL2';

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<SeriesL2 />} />
      <Route path='/series-l2' element={<SeriesL2 />} />
      <Route path='/test' element={<Home />} />


    </Routes>
  )
}

export default App