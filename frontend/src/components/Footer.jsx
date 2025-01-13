import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate('')
    return (
        <div className="md:mx-10">
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div className="">
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book your appointment with certified Hijama therapists and experience natural healing at its best.</p>
                </div>

                <div className="">
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li onClick={() => {
                            navigate('/')
                            scrollTo(0, 0)
                        }} className='cursor-pointer'>Home</li>
                        <li onClick={() => {
                            navigate('/about')
                            scrollTo(0, 0)
                        }} className='cursor-pointer'>About us</li>
                        <li onClick={() => {
                            navigate('/conatct')
                            scrollTo(0, 0)
                        }} className='cursor-pointer'>Contact us</li>
                        <li className='cursor-pointer'>Privacy policy</li>
                    </ul>
                </div>

                <div className="">
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    {/*  Random phone number and other credentials; I will change them later. */}
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='cursor-pointer'>03214569990</li>
                        <li className='cursor-pointer'>example@gmail.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>© 2025 Hijama Therapeutics | All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer