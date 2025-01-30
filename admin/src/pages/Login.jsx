import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets_admin/assets"
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const [state, setState] = useState('Admin')
    const { setAToken, BackendUrl } = useContext(AdminContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const res = await axios.post(`${BackendUrl}/admin/login`, { email, password })
                if (res.status === 200) {
                    localStorage.setItem('aToken', res.data.token)
                    setAToken(res.data.token)
                }
                

            }
            else {

            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <form onSubmit={submitHandler} className='min-h-[80vh] flex items-center'>
            <div className="flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === "Admin"
                        ?
                        <p>Therapist Login ? <span className='text-primary underline cursor-pointer' onClick={() => setState("Therapist")}>Click here</span></p>
                        :
                        <p>Admin Login ? <span className='text-primary underline cursor-pointer' onClick={() => setState("Admin")}>Click here</span></p>

                }
            </div>
        </form>
    )
}

export default Login