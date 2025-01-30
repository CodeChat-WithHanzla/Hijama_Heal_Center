import React, { useContext, useState } from 'react'
import { assets } from "../../assets/assets_admin/assets"
import axios from "axios";
import { AdminContext } from "../../context/AdminContext"
import { toast } from 'react-toastify';
function AddTherapist() {
    const [therapistImg, setTherapistImg] = useState(false)
    const [therapistName, setTherapistName] = useState('')
    const [therapistEmail, setTherapistEmail] = useState('')
    const [therapistPassword, setTherapistPassword] = useState('')
    const [therapistExperience, setTherapistExperience] = useState('SELECT')
    const [therapistFee, setTherapistFee] = useState('')
    const [therapistAbout, setTherapistAbout] = useState('')
    const [therapistSpeciality, setTherapistSpeciality] = useState('SELECT')
    const [therapistDegree, setTherapistDegree] = useState('')
    const [therapistAddress1, setTherapistAddress1] = useState('')
    const [therapistAddress2, setTherapistAddress2] = useState('')
    const { aToken, BackendUrl } = useContext(AdminContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!therapistImg) {
                return toast.error('Please Upload Therapist Image')
            }
            const formData = new FormData();
            formData.append('name', therapistName);
            formData.append('email', therapistEmail);
            formData.append('password', therapistPassword);
            formData.append('fees', therapistFee);
            formData.append('about', therapistAbout);
            formData.append('degree', therapistDegree);
            formData.append('address', JSON.stringify({ line1: therapistAddress1, line2: therapistAddress2 }));
            formData.append('image', therapistImg);
            if (therapistSpeciality === "SELECT") {
                return toast.error('Please Select Therapist Speciality')
            }
            if (therapistExperience === "SELECT") {
                return toast.error('Please Select Therapist Experience')
            }
            formData.append('speciality', therapistSpeciality);
            formData.append('experience', therapistExperience);
            const res = await axios.post(`${BackendUrl}/admin/addTherapist`, formData, {
                headers: {
                    token: aToken,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201) {
                toast.success('Therapist Added Successfully')
                setTherapistImg(false)
                setTherapistName('')
                setTherapistEmail('')
                setTherapistPassword('')
                setTherapistExperience('1 Year')
                setTherapistFee('')
                setTherapistAbout('')
                setTherapistSpeciality('SELECT')
                setTherapistDegree('')
                setTherapistAddress1('')
                setTherapistAddress2('')
            }
            else
                toast.error('Error During Adding Therapist')

        } catch (error) {
            toast.error('Error During Adding Therapist')

        }
    }
    return (
        <form className='m-5 w-full' onSubmit={handleSubmit}>
            <p className='mb-3 text-lg font-medium'>Add Therapist</p>
            <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="therapist-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer h-16 object-cover' src={(therapistImg && URL.createObjectURL(therapistImg)) || assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setTherapistImg(e.target.files[0])} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="file" id='therapist-img' hidden />
                    <p>Upload Therapist <br /> Picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Therapist Name</p>
                            <input value={therapistName} onChange={(e) => setTherapistName(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="text" placeholder='Name' required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Therapist Email</p>
                            <input value={therapistEmail} onChange={(e) => setTherapistEmail(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="email" placeholder='Email' required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Therapist Password</p>
                            <input value={therapistPassword} onChange={(e) => setTherapistPassword(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="password" placeholder='Password' required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>
                            <select required value={therapistExperience} onChange={(e) => setTherapistExperience(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none'>
                                <option value="SELECT">SELECT</option>
                                <option value='1 Year'>
                                    1 Year
                                </option>
                                <option value='2 Year'>
                                    2 Year
                                </option>
                                <option value='3 Year'>
                                    3 Year
                                </option>
                                <option value='4 Year'>
                                    4 Year
                                </option>
                                <option value='5 Year'>
                                    5 Year
                                </option>
                                <option value='6 Year'>
                                    6 Year
                                </option>
                                <option value='7 Year'>
                                    7 Year
                                </option>
                                <option value='8 Year'>
                                    8 Year
                                </option>
                                <option value='9 Year'>
                                    9 Year
                                </option>
                                <option value='10 Year'>
                                    10 Year
                                </option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input value={therapistFee} onChange={(e) => setTherapistFee(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="number" placeholder='Fees' required />
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select required value={therapistSpeciality} onChange={(e) => setTherapistSpeciality(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none'>
                                <option value="SELECT">SELECT</option>
                                <option value="MALE CUPPING">MALE CUPPING</option>
                                <option value="FEMALE CUPPING">FEMALE CUPPING</option>
                                <option value="FACIAL CUPPING">FACIAL CUPPING</option>
                                <option value="DRY CUPPING">DRY CUPPING</option>
                                <option value="WET CUPPING">WET CUPPING</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education</p>
                            <input value={therapistDegree} onChange={(e) => setTherapistDegree(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="text" placeholder='Education' required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input value={therapistAddress1} onChange={(e) => setTherapistAddress1(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="text" placeholder='address 1' required />
                            <input value={therapistAddress2} onChange={(e) => setTherapistAddress2(e.target.value)} className='border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' type="text" placeholder='address 2' required />
                        </div>
                    </div>
                </div>

                <div className="">
                    <p className='mt-4 mb-2'>About Therapist</p>
                    <textarea value={therapistAbout} onChange={(e) => setTherapistAbout(e.target.value)} className='w-full border rounded px-3 py-2 border-b border-gray-300 focus:border-blue-600 focus:outline-none' placeholder='Write About Therapist' rows={5} required />
                </div>
                <button type='submit' className='bg-primary text-white text-sm px-10 py-3 rounded-full mt-4'>Add Therapist</button>
            </div>
        </form>
    )
}

export default AddTherapist