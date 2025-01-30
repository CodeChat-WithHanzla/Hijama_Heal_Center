import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../context/AppContext"
import { toast } from 'react-toastify'
import axios from 'axios'
function MyAppointments() {
    const { BackendUrl, token, getAllTherapists } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_")
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }
    const getAppointments = async (req, res) => {
        try {
            const { status, data } = await axios.get(`${BackendUrl}/user/get-appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status == 200) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments);

            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (token)
            getAppointments()
    }, [token])
    const cancelAppointment = async (appointmentId) => {
        try {
            console.log(appointmentId);
            const { status, data } = await axios.post(`${BackendUrl}/user/cancel-appointment`, {
                appointmentId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status == 200) {
                toast.success(data.msg)
                getAppointments()
                getAllTherapists()
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            getAppointments()
        }
    }
    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
            <div className="">

                {
                    appointments.length >= 0 ? (appointments.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                            <div className="">
                                <img className='w-32 bg-indigo-50' src={item.therapistData.image} alt="" />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className='text-neutral-800 font-semibold'>{item.therapistData.name}</p>
                                <p>{item.therapistData.speciality}</p>
                                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                                <p className='text-xs'>{item.therapistData.address.line1}</p>
                                <p className='text-xs'>{item.therapistData.address.line2}</p>
                                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                            </div>
                            <div className=""></div>
                            <div className="flex flex-col gap-2 justify-end">
                                {
                                    !item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay online</button>
                                }
                                {
                                    !item.cancelled && <button button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                                }
                                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
                            </div>
                        </div>

                    ))) :
                        (<div className="text-center text-xl font-semibold text-gray-700 mt-5">
                            You've not a Booked Appointment
                        </div>)
                }
            </div>
        </div >
    )
}

export default MyAppointments