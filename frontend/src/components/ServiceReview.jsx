import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ServiceReview = ({ isOpen, setIsOpen }) => {
    const { submitFeedback } = useContext(AppContext);
    const [feedbackText, setFeedbackText] = useState("");
    const [rating, setRating] = useState(0);
    const [satisfaction, setSatisfaction] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!feedbackText || !satisfaction || rating === 0) {
            toast.error("Please provide feedback, select satisfaction level, and rate the service.");
            return;
        }

        submitFeedback({
            feedback: feedbackText,
            rating,
            satisfaction
        });

        navigate('/my-appointments');
    };

    return (
        <div className="relative">
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 relative">
                        <button
                            className="absolute top-4 left-4 text-gray-600 text-2xl"
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/my-appointments');
                            }}
                        >
                            ←
                        </button>

                        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Rate Your Experience
                        </h1>

                        <div className="flex justify-between mb-6">
                            <button
                                className={`flex-1 mr-2 px-4 py-2 rounded-xl border ${satisfaction === "Satisfied"
                                    ? "bg-blue-100 border-blue-500"
                                    : "border-gray-300"
                                    }`}
                                onClick={() => setSatisfaction("Satisfied")}
                            >
                                <span role="img" aria-label="Satisfied" className="text-2xl">
                                    😊
                                </span>
                                <p className="mt-1 text-sm text-gray-700">Satisfied</p>
                            </button>
                            <button
                                className={`flex-1 ml-2 px-4 py-2 rounded-xl border ${satisfaction === "Not Satisfied"
                                    ? "bg-red-100 border-red-500"
                                    : "border-gray-300"
                                    }`}
                                onClick={() => setSatisfaction("Not Satisfied")}
                            >
                                <span role="img" aria-label="Not Satisfied" className="text-2xl">
                                    😔
                                </span>
                                <p className="mt-1 text-sm text-gray-700">Not Satisfied</p>
                            </button>
                        </div>

                        <textarea
                            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
                            placeholder="Tell us how we can improve..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>

                        <h2 className="text-base font-semibold text-gray-800 mb-2">
                            Rank our service provider
                        </h2>
                        <div className="flex items-center mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <img
                                src={assets.logo}
                                alt="Medical Icons"
                                className="h-16 w-16"
                            />
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceReview;