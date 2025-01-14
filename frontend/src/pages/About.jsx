import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function About() {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-12">
                <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 tetx-sm text-gray-600">
                    <p>Welcome to our platform, where we connect you with professional hijama specialists to help you improve your well-being through traditional cupping therapy.</p>
                    <p>Our aim is to provide a convenient and reliable way to book appointments with certified and experienced hijama therapists in your area.</p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>To promote the benefits of hijama therapy globally, ensuring easy access to qualified specialists who are dedicated to enhancing your health and wellness.</p>
                </div>

            </div>
            <div className="text-xl my-4">
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>EFFICIENCY:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>CONVENIENCE:</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>PERSONALIZATION:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    )
}

export default About