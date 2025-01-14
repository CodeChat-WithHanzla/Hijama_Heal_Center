import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
function Therapists() {
    const [filterDoc, setFilterDoc] = useState([])
    const { speciality } = useParams()
    const navigate = useNavigate()
    const [showFilter, setShowFilter] = useState(false)
    const { therapists } = useContext(AppContext)
    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(therapists.filter(therapist => therapist.speciality.toLowerCase() === speciality.toLowerCase()))
        }
        else
            setFilterDoc(therapists)
    }
    useEffect(() => {
        applyFilter()
    }, [therapists, speciality])

    return (
        <div>
            <p className='text-gray-600 mt-5'>Browse through the therapists specialist</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <button onClick={() => setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ''}`}>Filters</button>
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p onClick={() => navigate('/therapists')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === undefined ? 'bg-indigo-100 text-black' : ''}`}>All</p>
                    <p onClick={() => speciality === 'MALE CUPPING' ? navigate('/therapists') : navigate(`/therapists/MALE CUPPING`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'MALE CUPPING' ? 'bg-indigo-100 text-black' : ''}`}>MALE CUPPING</p>
                    <p onClick={() => speciality === 'FEMALE CUPPING' ? navigate('/therapists') : navigate('/therapists/FEMALE CUPPING')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'FEMALE CUPPING' ? 'bg-indigo-100 text-black' : ''}`}>FEMALE CUPPING</p>
                    <p onClick={() => speciality === 'FACIAL CUPPING' ? navigate('/therapists') : navigate('/therapists/FACIAL CUPPING')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'FACIAL CUPPING' ? 'bg-indigo-100 text-black' : ''}`}>FACIAL CUPPING</p>
                    <p onClick={() => speciality === 'DRY CUPPING' ? navigate('/therapists') : navigate('/therapists/DRY CUPPING')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'DRY CUPPING' ? 'bg-indigo-100 text-black' : ''}`}>DRY CUPPING</p>
                    <p onClick={() => speciality === 'WET CUPPING' ? navigate('/therapists') : navigate('/therapists/WET CUPPING')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap ${speciality === 'WET CUPPING' ? 'bg-indigo-100 text-black' : ''}`}>WET CUPPING</p>
                </div>
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.map((item, index) => (
                        <div onClick={() => navigate(`/appointments/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                            <img className='bg-blue-50 ' src={item.image} alt="" />
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Therapists