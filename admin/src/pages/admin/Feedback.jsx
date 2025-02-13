import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';

function Feedback() {
    const { aToken, feedback, getAllFeedback } = useContext(AdminContext);
    const { slotDateFormatIso } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (aToken) {
            getAllFeedback();
        } else {
            navigate('/');
        }
    }, [aToken]);

    return (
        <div className='w-full max-w-6xl mx-auto p-4'>
            <p className='mb-4 text-xl font-semibold'>All Feedback</p>

            <div className="bg-white border rounded-lg text-sm max-h-[80vh] overflow-y-auto min-h-[60vh] shadow-md">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_2fr_2fr_2fr] py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium">
                    <p>#</p>
                    <p>User</p>
                    <p>Feedback</p>
                    <p>Rating</p>
                    <p>Satisfaction</p>
                    <p>Date</p>
                </div>

                {/* Table Rows */}
                {feedback.length > 0 ? (
                    feedback.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_3fr_2fr_2fr_2fr] items-center gap-4 text-gray-600 py-4 px-6 border-b hover:bg-gray-100 transition"
                        >
                            <p className='hidden sm:block'>{index + 1}</p>

                            <div className='flex items-center gap-3'>
                                {item.user?.image && (
                                    <img className='w-8 h-8 object-cover rounded-full' src={item.user.image} alt="" />
                                )}
                                <div>
                                    <p className="font-medium">{item.user?.name || 'N/A'}</p>
                                    <p className='text-[10px] text-gray-500'>{item.user?.email || 'N/A'}</p>
                                </div>
                            </div>

                            <p className="text-sm">{item.feedback || item.comment}</p>
                            <p className="font-medium">{item.rating}</p>
                            <p className="text-gray-700">{item.satisfaction || 'N/A'}</p>
                            <p className="text-gray-500">{slotDateFormatIso(item.createdAt)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-6">No feedback available</p>
                )}
            </div>
        </div>
    );
}

export default Feedback;