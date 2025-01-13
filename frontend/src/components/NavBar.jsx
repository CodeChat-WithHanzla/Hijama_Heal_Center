import React, { useState } from 'react'
import { assets } from "../assets/assets_frontend/assets"
import { NavLink, useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

    return (
        <div className='flex items-center justify-between text-sm py-4 border-b border-b-gray-400'>
            <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='w-44 cursor-pointer' src={assets.logo} alt='' />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink className='py-1' to='/'>
                    <li>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden' />
                </NavLink>
                <NavLink className='py-1' to='/therapists'>
                    <li>All Therapists</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden' />
                </NavLink>
                <NavLink className='py-1' to='/about'>
                    <li>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden' />
                </NavLink>
                <NavLink className='py-1' to='contact'>
                    <li>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden' />
                </NavLink>
            </ul>
            <div className="flex items-center justify-center gap-4">
                {
                    token ? <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 text-sm">
                                <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-profile')}>My Profile</p>
                                <p className='hover:text-black cursor-pointer' onClick={() => navigate('/my-appointments')}>My Appointments</p>
                                <p className='hover:text-black cursor-pointer' onClick={() => setToken(false)}>Logout</p>
                            </div>
                        </div>
                    </div>
                        :
                        <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                            Create account
                        </button>
                }
            </div>
        </div>
    )
}

export default NavBar