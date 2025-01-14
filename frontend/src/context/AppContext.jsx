import { createContext } from "react";
import { therapists } from '../assets/assets_frontend/assets'
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const currencySymbol = '₨'
    const value = {
        therapists,
        currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider