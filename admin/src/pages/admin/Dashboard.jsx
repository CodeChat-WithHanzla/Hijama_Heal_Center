import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets_admin/assets"
function Dashboard() {
    const { aToken, dashboardData, getDashboardData, cancelAppointment } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)
    useEffect(() => {
        if (aToken) {
            getDashboardData()
        }
    }, [aToken])
    return dashboardData && (
        <div className='m-5'>
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.doctor_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{dashboardData.therapists}</p>
                        <p className='text-gray-400'>Therapists</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{dashboardData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div className="">
                        <p className='text-lg font-semibold text-gray-600'>{dashboardData.patients}</p>
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
                        dashboardData.lastestAppointments?.length > 0 &&
                        dashboardData.lastestAppointments.map((item, index) => (
                            <div key={index} className="flex items-center p-3 gap-3 hover:bg-gray-100">
                                <img className='rounded-full w-10' src={item.therapistData.image} alt="" />
                                <div className="flex-1 text-sm">
                                    <p className='text-gray-800 font-medium'>{item.therapistData.name}</p>
                                    <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                                </div>
                                {
                                    item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard