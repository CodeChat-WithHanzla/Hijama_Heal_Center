import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Therapists from "./pages/Therapists"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="mx-3 sm:mx-[10%] ">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/therapists' element={<Therapists />} />
        <Route path='/therapists/:speciality' element={<Therapists />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointments/:therapistId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App