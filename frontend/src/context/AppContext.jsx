import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios"
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [therapists, setTherapists] = useState([])
    const [userData, setUserData] = useState(null)
    const BackendUrl = import.meta.env.VITE_BASE_URL;
    const getAllTherapists = async () => {
        try {
            const { data, status } = await axios.get(`${BackendUrl}/therapists/allTherapists`)
            if (status === 200)
                setTherapists(data.therapists)
            else {
                toast.error('Failed to fetch therapists, Please Check your internet connection')
            }
        } catch (error) {
            toast.error('Failed to fetch therapists, Please Check your internet connection')
            console.log(error.message);

        }
    }
    const [token, setToken] = useState(localStorage.getItem('AccessToken'));
    const loadUserData = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/user/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.status === 200) {
                setUserData(res.data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const submitFeedback = async ({ feedback, rating, satisfaction }) => {
        try {
            const { data, status } = await axios.post(`${BackendUrl}/user/feedback`, { feedback, rating, satisfaction }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
                toast.success(data.message)
            }
            else {
                console.log(data.message);
                toast.error("Submission failed. Please try again.")
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Submission failed. Please try again.")
        }
    }
    const currencySymbol = '₨'
    const value = {
        BackendUrl,
        therapists,
        currencySymbol,
        getAllTherapists,
        userData,
        setUserData,
        loadUserData,
        token,
        setToken,
        submitFeedback
    }
    useEffect(() => {

        if (token) {
            loadUserData();
        } else {
            console.log('No token found, setting userData to null');
            setUserData(null);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider