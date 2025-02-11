import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Contact() {
    return (
        <div>
            <div className='text-gray-500 text-2xl text-center pt-10'>
                <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
            </div>
            <div className="my-10 flex justify-center flex-col md:flex-row gap-10 mb-28 text-sm">
                <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
                    <p className='text-gray-500'>00000 Railways Station <br />Suite 000, Lahore, Pakistan</p>
                    <p className='text-gray-500'>Tel: (000) 000-0000 <br />Email: hanzlaasam@gmail.com</p>
                    <p className='font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>
                    <p className='font-semibold text-lg text-gray-600'>Learn more about our teams and job openings.</p>
                </div>
            </div>
        </div>
    )
}

export default Contact