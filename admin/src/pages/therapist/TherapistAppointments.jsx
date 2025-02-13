import React, { useContext, useEffect } from 'react'
import { TherapistContext } from "../../context/TherapistContext"
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets"
import { useNavigate } from 'react-router'
function TherapistAppointments() {
    const { therapistToken, appointments, getAppointments, appointmentComplete, appointmentCancel } = useContext(TherapistContext)
    const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (therapistToken)
            getAppointments()
        else
            navigate('/')
    }, [therapistToken])
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 px-6 py-3 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                {
                    appointments && appointments.length > 0 && appointments.reverse().map((item, index) => (
                        <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100">
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img className='w-8 h-8 rounded-full object-cover' src={item.userData?.image} alt="" />
                                <p>{item.userData.name}</p>
                            </div>
                            <div className="">
                                <p className='text-xs inline border border-primary px-2 rounded-full'>{item.payment ? "Online" : "Cash"}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge({ dob: item.userData?.dob })}</p>
                            <p>{slotDateFormat(item?.slotDate)},{item?.slotTime}</p>
                            <p>{currencySymbol}.{item.therapistData?.fees}</p>


                            {
                                item.cancelled === true ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
                                    item.isCompleted === true ? <p className='text-green-400 text-xs font-medium'>Completed</p> :
                                        <div className="flex">
                                            < img onClick={() => appointmentCancel(item?._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                            <img onClick={() => appointmentComplete(item?._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                        </div>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default TherapistAppointments