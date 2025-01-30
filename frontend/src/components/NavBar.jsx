import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_frontend/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function NavBar() {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const { token, setToken, userData } = useContext(AppContext)
    return (
        <div className='flex items-center justify-between text-sm py-4 border-b border-b-gray-400'>
            <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='w-44 cursor-pointer' src={assets.logo} alt='' />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink className='py-1' to='/'>
                    <li>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden' />
                </NavLink>
                <NavLink className='py-1' to='/therapists'>
                    <li>All THERAPISTS</li>
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
                    token && userData ? <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img className='w-10 h-10 rounded-full object-cover' src={userData.image} alt="" />
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
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/therapists'><p className='px-4 py-2 rounded inline-block'>All THERAPISTS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar