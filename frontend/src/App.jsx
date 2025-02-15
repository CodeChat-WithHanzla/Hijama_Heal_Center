import React, { useEffect } from 'react'
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
import { ToastContainer } from 'react-toastify';
import { generateToken } from "./conf/firebase"
import axios from 'axios'
import { getMessaging, onMessage } from "firebase/messaging";
function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:");
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    const requestFCMToken = async () => {
      try {
        const fcmToken = await generateToken();

        if (fcmToken) {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/user/send-notification`, {
            fcmToken,
            title: "Time to Rejuvenate! 🌿",
            body: "Experience the healing power of Hijama therapy! Book your session today and restore balance to your body & mind. 🌿✨ Limited slots available!",
          });
        } else {
          console.warn("No FCM Token received. User might have denied permission.");
        }
      } catch (error) {
        console.error("Error getting FCM Token:", error);
      }
    };

    requestFCMToken();
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Foreground Notification:", payload);
    });
  }, []);
  return (
    <div className="mx-3 sm:mx-[10%] ">
      <NavBar />
      <ToastContainer />
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