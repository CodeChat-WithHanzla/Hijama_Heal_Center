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
function App() {
  const { aToken } = useContext(AdminContext)
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-therapist' element={<AddTherapist />} />
          <Route path='/therapist-list' element={<TherapistList />} />
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