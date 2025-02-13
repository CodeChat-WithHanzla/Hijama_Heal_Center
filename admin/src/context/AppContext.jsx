import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const calculateAge = ({ dob }) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age;
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_")
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }
    const slotDateFormatIso = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };
    const currencySymbol = '₨'
    const value = { calculateAge, slotDateFormat, currencySymbol, slotDateFormatIso }
    return (
        <AppContext.Provider value={value}>
            {
                children
            }
        </AppContext.Provider>
    )
}
export default AppContextProvider