import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedTherapists from '../components/RelatedTherapists';

function Appointment() {
    const { therapistId } = useParams();
    const { therapists, currencySymbol } = useContext(AppContext);
    const [therapistInfo, setTherapistInfo] = useState(null);
    const [therapistSlots, setTherapistSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const fetchTherapistInfo = async () => {
        const therapistInfo = therapists.find(therapist => therapist._id === therapistId);
        setTherapistInfo(therapistInfo);
    };

    const getAvailableSlots = async () => {
        setTherapistSlots([]);
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0); // Set end time to 9:00 PM

            if (today.getDate() === currentDate.getDate()) {
                let now = new Date();
                if (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() >= 30)) {
                    continue; // Skip the current day if time is past 8:30 PM
                }
                currentDate.setHours(
                    currentDate.getHours() > 20 ? 10 : Math.max(currentDate.getHours() + 1, 10)
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Filter out slots where the current time has passed
                if (new Date() < currentDate) {
                    timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
            }

            if (timeSlots.length > 0) {
                setTherapistSlots(prev => [...prev, timeSlots]);
            }
        }
    };

    useEffect(() => {
        fetchTherapistInfo();
    }, [therapists, therapistId]);

    useEffect(() => {
        if (therapistInfo) {
            getAvailableSlots();
        }
    }, [therapistInfo]);

    return therapistInfo && (
        <div className="mt-5">
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    <img
                        className="bg-primary w-full sm:max-w-72 rounded-lg"
                        src={therapistInfo.image}
                        alt=""
                    />
                </div>

                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                    <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                        {therapistInfo.name}{' '}
                        <img className="w-5" src={assets.verified_icon} alt="" />
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                        <p>{therapistInfo.degree} - {therapistInfo.speciality}</p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">{therapistInfo.experience}</button>
                    </div>

                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                            About <img src={assets.info_icon} alt="" />
                        </p>
                        <p className="text-sm text-gray-500 max-w-[700px] mt-1">{therapistInfo.about}</p>
                    </div>
                    <p className="text-gray-500 font-medium mt-4">
                        Appointment fee :{' '}
                        <span className="text-gray-600">
                            {currencySymbol} {therapistInfo.fees}
                        </span>
                    </p>
                </div>
            </div>

            <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                <p>Booking slots</p>
                <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                    {
                        therapistSlots.length && therapistSlots.map((item, index) => (
                            item.length > 0 && (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    key={index}
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                                >
                                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p>{item[0] && item[0].datetime.getDate()}</p>
                                </div>
                            )
                        ))
                    }
                </div>
                <div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
                    {
                        therapistSlots.length && therapistSlots[slotIndex]?.map((item, index) => (
                            <p
                                onClick={() => setSlotTime(item.time)}
                                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`}
                                key={index}
                            >
                                {item.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>
                <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
                    Book an appointment
                </button>

                <RelatedTherapists therapistId={therapistId} speciality={therapistInfo.speciality} />
            </div>
        </div>
    );
}

export default Appointment;
