import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Test from './Components/Pages/Test'

const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />


    </Routes>
  )
}

export default App