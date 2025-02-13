import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AdminContext = createContext()
const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
    const [therapists, setTherapists] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashboardData, setDashboardData] = useState([])
    const [feedback, setFeedback] = useState([])
    const BackendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllTherapists = async () => {
        try {
            const { data, status } = await axios.get(`${BackendUrl}/admin/all-therapist`, { headers: { token: aToken } })
            if (status === 200)
                setTherapists(data.therapists)
            console.log(data.therapists);

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong.");
            } else if (error.request) {
                toast.error("No response from the server. Please try again later.");
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    }
    const changeAvailability = async ({ _id }) => {
        try {
            const { status, message } = await axios.put(`${BackendUrl}/admin/changeAvailability`, { _id }, {
                headers: { token: aToken },
            })
            if (status == 200) {
                toast.success(message || "Availability updated successfully")
                getAllTherapists()
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update availability");
        }
    }
    const getAllAppointments = async () => {
        try {
            const { status, data } = await axios.get(`${BackendUrl}/admin/all-appointments`, { headers: { token: aToken } })
            if (status === 200) {
                setAppointments(data.appointments)
                console.log(data.appointments);

            }
            else
                toast.error("Failed to fetch appointments")
        } catch (error) {
            toast.error("Failed to fetch appointments")
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const { status, data } = await axios.put(`${BackendUrl}/admin/cancel-appointments`, { appointmentId }, { headers: { token: aToken } })
            if (status === 200) {
                toast.success(data.msg)
                getAllAppointments()
            }
            else
                toast.error(data.msg)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getDashboardData = async () => {
        try {
            const { status, data } = await axios.get(`${BackendUrl}/admin/dashboard`, { headers: { token: aToken } })
            if (status === 200) {
                setDashboardData(data.dashBoardData)
                console.log(data.dashBoardData);
            }
            else
                toast.error("Failed to fetch dashboard data")
        } catch (error) {
            toast.error("Failed to fetch dashboard data")
        }
    }
    const getAllFeedback = async () => {
        try {
            const { data, status } = await axios.get(`${BackendUrl}/admin/feedback`, { headers: { token: aToken } })
            if (status === 200) {
                console.log(data);
                setFeedback(data)
            }
            else {
                toast.error("Failed to get feedback. Please try again later.");
                console.log(data.message);
            }
        } catch (error) {
            toast.error("Failed to get feedback. Please try again later.");
            console.log(error.message)
        }
    }
    const value = {
        aToken, setAToken, BackendUrl, getAllTherapists, therapists, changeAvailability, appointments, setAppointments, getAllAppointments, cancelAppointment, dashboardData, getDashboardData, feedback, getAllFeedback
    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider