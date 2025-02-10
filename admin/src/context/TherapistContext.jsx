import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"
export const TherapistContext = createContext()
const TherapistContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [therapistToken, setTherapistToken] = useState(localStorage.getItem('therapistToken') || '')
    const [appointments, setAppointments] = useState([])
    const [dashBoardData, setDashBoardData] = useState({})
    const [profileData, setProfileData] = useState({})
    const getAppointments = async () => {
        try {
            const { status, data } = await axios.get(`${backendUrl}/therapists/appointments`, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                setAppointments(data.appointments)
            }

            else {
                toast.error('Failed to load appointments', data.message)
                console.log(data.message);

            }
        } catch (error) {
            console.log(error.message);

            toast.error('Failed to load appointments', error.message)
        }
    }
    const appointmentComplete = async (appointmentId) => {
        try {
            const { status, data } = await axios.put(`${backendUrl}/therapists/complete-appointment`, { appointmentId }, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                toast.success(data.message)
                getAppointments()
            }
            else {

            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to load appointments', error.message)
        }
    }
    const appointmentCancel = async (appointmentId) => {
        try {
            const { status, data } = await axios.put(`${backendUrl}/therapists/cancel-appointment`, { appointmentId }, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                toast.success(data.message)
                getAppointments()
            }
            else {
                toast.error('Failed to load appointments')
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to load appointments', error.message)
        }
    }
    const getDashBoardData = async () => {
        try {
            const { status, data } = await axios.get(`${backendUrl}/therapists/dashboard`, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                setDashBoardData(data.dashBoardData)
                console.log(data.dashBoardData);
            }
            else {
                console.log(data.message);
                toast.error('Failed to load DashBoard Data')
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to load DashBoard Data')
        }
    }
    const getProfileData = async () => {
        try {
            const { status, data } = await axios.get(`${backendUrl}/therapists/profile`, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                setProfileData(data.profileData)
                console.log(data.profileData);
            }
            else {
                console.log(data.message);
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Get Profile Data', error.message)
        }
    }
    const updateProfile = async (updatedData) => {
        try {
            const { status, data } = await axios.put(`${backendUrl}/therapists/update-profile`, updatedData, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200)
                toast.success(data.message)
            else
                toast.error("Failed to Update Profile Data")
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to Get Update Data', error.message)
        }
    }
    const value = { therapistToken, setTherapistToken, backendUrl, appointments, setAppointments, getAppointments, appointmentComplete, appointmentCancel, dashBoardData, getDashBoardData, profileData, getProfileData, setProfileData, updateProfile }
    return (
        <TherapistContext.Provider value={value}>
            {children}
        </TherapistContext.Provider>
    )
}
export default TherapistContextProvider;