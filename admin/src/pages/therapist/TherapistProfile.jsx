import React, { useContext, useEffect, useState } from 'react'
import { TherapistContext } from "../../context/TherapistContext"
import { AppContext } from "../../context/AppContext"
import { useNavigate } from 'react-router'
function TherapistProfile() {
    const [isEdit, setIsEdit] = useState(false)
    const { therapistToken, profileData, getProfileData, setProfileData, updateProfile } = useContext(TherapistContext)
    const { currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()
    const handleClick = async () => {
        if (isEdit) {
            await updateProfile(profileData);
        }
        setIsEdit(!isEdit);
    };
    useEffect(() => {
        if (therapistToken)
            getProfileData()
        else
            navigate('/')
    }, [therapistToken])
    return profileData && (
        <div>
            <div className="flex flex-col gap-4 m-5">
                <div className="">
                    <img className='bg-primary w-full sm:max-w-64 rounded-lg' src={profileData?.image} alt="" />
                </div>
                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                    {/* Profile */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData?.name}</p>



                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>{profileData?.degree} - {profileData?.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData?.experience}</button>

                    </div>
                    {/* About */}
                    <div className="">
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData?.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Appoitment Fee: {
                        <span className='text-gray-800'>{currencySymbol}.{isEdit ? <input className='bg-gray-50 font-medium max-w-60 mt-4 outline-blue-600 p-2 rounded' type="number" value={profileData.fees} onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} /> : profileData?.fees}</span>
                    }</p>
                    <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p>
                            {
                                isEdit ? <input className='bg-gray-50  font-medium max-w-60 mt-4 outline-blue-600 p-2 rounded' type="text" value={profileData?.address?.line1} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /> : profileData?.address?.line1
                            }
                            < br />

                            {
                                isEdit ? <input className='bg-gray-50  font-medium max-w-60 mt-4 outline-blue-600 p-2 rounded' type="text" value={profileData?.address?.line2} onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} /> : profileData?.address?.line2
                            }
                        </p>
                    </div>
                    <div className="flex gap-1 pt-2 items-center">

                        <input name='checkbox' className='w-5 h-5 outline-blue-600 rounded' onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
                        <label htmlFor="checkbox">Available</label>
                    </div>
                    <button className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all' onClick={handleClick}>{isEdit ? "Save" : "Edit"}</button>
                </div>
            </div>
        </div>
    )
}

export default TherapistProfile