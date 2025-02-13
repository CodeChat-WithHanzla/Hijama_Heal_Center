import React, { useContext, useEffect } from 'react'
import { AdminContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login'
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router';
import Dashboard from "./pages/admin/Dashboard"
import AllAppointments from './pages/admin/AllAppointments';
import AddTherapist from './pages/admin/AddTherapist';
import TherapistList from './pages/admin/TherapistList';
import { TherapistContext } from './context/TherapistContext';
import TherapistDashboard from './pages/therapist/TherapistDashboard';
import TherapistAppointments from "./pages/therapist/TherapistAppointments"
import TherapistProfile from "./pages/therapist/TherapistProfile"
import Feedback from './pages/admin/Feedback';
function App() {
  const { aToken } = useContext(AdminContext)
  const { therapistToken } = useContext(TherapistContext)
  return therapistToken || aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-therapist' element={<AddTherapist />} />
          <Route path='/therapist-list' element={<TherapistList />} />
          <Route path='/feedback' element={<Feedback />} />
          {/* Therapist Routes */}
          <Route path='/therapist-dashboard' element={<TherapistDashboard />} />
          <Route path='/therapist-appointments' element={< TherapistAppointments />} />
          <Route path='/therapist-profile' element={< TherapistProfile />} />
        </Routes>
      </div>
    </div>
  ) :
    (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App