import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router'
import { assets } from "../assets/assets_admin/assets"
import { TherapistContext } from '../context/TherapistContext'
function SideBar() {
    const { aToken } = useContext(AdminContext)
    const { therapistToken } = useContext(TherapistContext)
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken &&
                <ul className='text-[#515151] mt-5'>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/admin-dashboard'>
                        <img src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/all-appointments'>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointment</p>
                    </NavLink>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/add-therapist'>
                        <img src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Therapist</p>
                    </NavLink>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/therapist-list'>
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Therapist List</p>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/feedback'>
                        <img src={assets.feedback_icon} alt="" className='w-10 h-10 object-contain'/>
                        <p className='hidden md:block'>Users Feedbacks</p>
                    </NavLink>
                </ul>
            }
            {
                therapistToken &&
                <ul className='text-[#515151] mt-5'>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/therapist-dashboard'>
                        <img src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/therapist-appointments'>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointment</p>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                        }`
                    } to='/therapist-profile'>
                        <img src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Therapist Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default SideBar