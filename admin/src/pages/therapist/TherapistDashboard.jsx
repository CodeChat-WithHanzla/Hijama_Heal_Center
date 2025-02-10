import React, { useContext, useEffect } from 'react'
import { TherapistContext } from '../../context/TherapistContext'
import { AppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets_admin/assets"
function TherapistDashboard() {
    const { therapistToken, dashBoardData, getDashBoardData, appointmentCancel, appointmentComplete } = useContext(TherapistContext)
    const { currencySymbol, slotDateFormat } = useContext(AppContext)
    useEffect(() => {
        if (therapistToken)
            getDashBoardData()
    }, [therapistToken])
    return dashBoardData && (
        <div className='m-5'>
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.earning_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{currencySymbol}.{dashBoardData?.earnings}</p>
                        <p className='text-gray-400'>Earnings</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{dashBoardData?.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{dashBoardData?.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>
            <div className="bg-white ">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border ">
                    <img src={assets.list_icon} alt="" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>
                <div className="pt-4 border border-t-0">
                    {
                        dashBoardData.latestAppointments?.length > 0 &&
                        dashBoardData.latestAppointments.map((item, index) => (
                            <div key={index} className="flex items-center p-3 gap-3 hover:bg-gray-100">
                                <img className='rounded-full w-10 h-10 object-cover' src={item.userData.image} alt="" />
                                <div className="flex-1 text-sm">
                                    <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                                    <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                                </div>
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
        </div>
    )
}

export default TherapistDashboard