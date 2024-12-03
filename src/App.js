import React from 'react';
import Home from './Components/Pages/Home';
import { Route, Routes } from 'react-router-dom';
import SeriesL2 from './Components/Pages/SeriesL2';
import NotFound from './Components/Pages/NotFound';
import Landing from './Components/Pages/Landing';
import Test from './Components/Pages/Test';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/series-l2' element={<SeriesL2 />} />
      <Route path='/home' element={<Home />} />
      <Route path='/test' element={<Test />} />
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App