import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Test from './Components/Pages/Test'
import SeriesL2 from './Components/Pages/SeriesL2'

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/series-l2' element={<SeriesL2 />} />
      <Route path='/test' element={<Test />} />


    </Routes>
  )
}

export default App