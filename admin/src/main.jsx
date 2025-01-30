import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AdminContextProvider from "./context/AdminContext"
import TherapistContextProvider from "./context/TherapistContext"
import AppContextProvider from "./context/AppContext"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TherapistContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TherapistContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
