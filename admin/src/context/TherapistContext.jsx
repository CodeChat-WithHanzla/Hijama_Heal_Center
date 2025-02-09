import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"
export const TherapistContext = createContext()
const TherapistContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [therapistToken, setTherapistToken] = useState(localStorage.getItem('therapistToken') || '')
    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const { status, data } = await axios.get(`${backendUrl}/therapists/appointments`, { headers: { Authorization: `Bearer ${therapistToken}` } })
            if (status === 200) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse());
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

            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to load appointments', error.message)
        }
    }
    const value = { therapistToken, setTherapistToken, backendUrl, appointments, setAppointments, getAppointments, appointmentComplete, appointmentCancel }
    return (
        <TherapistContext.Provider value={value}>
            {children}
        </TherapistContext.Provider>
    )
}
export default TherapistContextProvider;