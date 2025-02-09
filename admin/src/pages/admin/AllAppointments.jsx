import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets"
function AllAppointments() {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
    const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)
    useEffect(() => {
        if (aToken)
            getAllAppointments()

    }, [aToken])
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
                <div className="grid sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Therapist</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>
                {
                    appointments.length > 0 && appointments.map((item, index) => (
                        <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200">
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 object-cover rounded-full' src={item.userData.image} alt="" />
                                <p>{item.userData.name}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge({ dob: item.userData.dob })}</p>
                            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 object-cover rounded-full bg-gray-200' src={item.therapistData.image} alt="" />
                                <p>{item.therapistData.name}</p>
                            </div>
                            <p>{currencySymbol}.{item.therapistData.fees}</p>
                            {
                                item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllAppointments