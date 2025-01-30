import { createContext } from "react";

export const TherapistContext = createContext()
const TherapistContextProvider = ({ children }) => {
    const value = {}
    return (
        <TherapistContext.Provider value={value}>
            {children}
        </TherapistContext.Provider>
    )
}
export default TherapistContextProvider;