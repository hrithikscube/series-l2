import React from 'react';
import Home from './Components/Pages/Home';
import { Route, Routes } from 'react-router-dom';
import SeriesL2 from './Components/Pages/SeriesL2';
import NotFound from './Components/Pages/NotFound';

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<SeriesL2 />} />
      <Route path='/test' element={<Home />} />
      <Route path='*' element={<NotFound />} />


    </Routes>
  )
}

export default App