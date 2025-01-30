import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AdminContext = createContext()
const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
    const [therapists, setTherapists] = useState([])
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
    const value = {
        aToken, setAToken, BackendUrl, getAllTherapists, therapists, changeAvailability
    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider