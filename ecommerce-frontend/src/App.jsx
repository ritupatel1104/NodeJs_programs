import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import JoinUs from './pages/joinus'
import ProfilePage from './pages/ProfilePage'
import Home from './pages/Home'

const App = () => {
  return (
    <>
     <Routes>

          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/join" element={<JoinUs />}/>
          <Route path="/profile" element={<ProfilePage/>}/>

     </Routes>
    
    </>
  )
}

export default App
