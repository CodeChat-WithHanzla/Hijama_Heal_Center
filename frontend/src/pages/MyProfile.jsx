import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from "../assets/assets_frontend/assets"
import axios from 'axios'
import { toast } from 'react-toastify'
function MyProfile() {
    const { userData, setUserData, loadUserData, token, BackendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            if (image)
                formData.append("image", image);
            formData.append("name", userData.name);
            formData.append("email", userData.email);
            formData.append("phone", userData.phone);
            formData.append("dob", userData.dob);
            formData.append("gender", userData.gender);
            formData.append("address", JSON.stringify(userData.address));
            const response = await axios.put(`${BackendUrl}/user/update-user`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                await loadUserData();
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            toast.error('Issue while Updating the Profile')
        }
        finally {
            setIsEdit(false)
            setImage(false)
        }
    }
    useEffect(() => {
        loadUserData()
    }, [])
    return userData && (
        <div className='max-w-lg flex flex-col gap-2 text-sm mt-5'>
            {isEdit ?
                <label htmlFor='image'>
                    <div className="inline-block relative cursor-pointer">
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                :
                <img className='w-36 rounded' src={userData.image} alt="" />}

            {
                isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 outline-blue-600 p-2 rounded' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                    :
                    <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }
            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div className="">
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3'>
                    <p className='font-medium'>Email :</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit ? <input className='bg-gray-100 max-w-52 outline-blue-600 p-2 rounded' type="tel" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            :
                            <p className='text-blue-400'>{userData.phone}</p>
                    }
                    <p className='font-medium'>Address:</p>
                    {
                        isEdit ? <p>
                            <input className='bg-gray-50 outline-blue-600 p-2 rounded mb-1' type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                            <br />
                            <input className='bg-gray-50 outline-blue-600 p-2 rounded mb-1' type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                        </p>
                            :
                            <p className='text-gray-500'>
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>

            <div className="">
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className='font-medium'>Gender:</p>
                    {
                        isEdit ? <select className='max-w-20 bg-gray-100 p-1 outline-blue-500' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                            :
                            <p className='text-gray-400'>{userData.gender}</p>
                    }
                    <p className='font-medium'>Birthday:</p>
                    {
                        isEdit ?
                            <input className='max-w-28 bg-gray-100 outline-blue-500 p-1' type="date" value={userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                            />
                            :
                            <p className='text-gray-400'>{userData.dob}</p>
                    }
                </div>
            </div>

            <div className="mt-10">
                {
                    isEdit ?
                        <button className='border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all duration-500' onClick={updateUserProfile}>Save information</button>
                        :
                        <button className='border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all duration-500' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile