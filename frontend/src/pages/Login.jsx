import React, { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otpState, setOtpState] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);
    const showToast = (message, isSuccess) => {
        if (isSuccess) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Sign Up') {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, {
                    name,
                    email,
                    phone,
                    password
                });
                setOtpState(true);
                showToast("OTP sent to your email!", true);
            } else {
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
                    email,
                    password
                });
                localStorage.setItem('AccessToken', data.accessToken);
                setToken(data.accessToken);
                navigate('/');
                showToast("Login successful!", true);
            }
        } catch (error) {
            showToast("Error occurred. Please try again.", false);
        }
    };

    const onVerifyOtpHandler = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/user/verifyEmail`, {
                email,
                otp
            });
            showToast("Email verified successfully!", true);
            setOtpState(false);
            setState('Login');
        } catch (error) {
            showToast("Invalid OTP. Please try again.", false);
        }
    };

    return (
        <div className='relative min-h-[80vh] flex items-center'>
            <form
                className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'
                onSubmit={otpState ? onVerifyOtpHandler : onSubmitHandler}
            >
                {otpState ? (
                    <>
                        <p className='text-2xl font-semibold'>Verify Email</p>
                        <p className='text-sm'>
                            An OTP has been sent to your email: <span className="font-medium">{email}</span>. Please enter it below to verify your email.
                        </p>
                        <div className='w-full'>
                            <p>Enter OTP</p>
                            <input
                                required
                                className='border outline-blue-600 rounded w-full p-2 mt-1'
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base' type='submit'>Verify OTP</button>
                    </>
                ) : (
                    <>
                        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment</p>
                        {state === 'Sign Up' && (
                            <>
                                <div className='w-full'>
                                    <p>Full Name</p>
                                    <input
                                        required
                                        className='border outline-blue-600 rounded w-full p-2 mt-1'
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='w-full'>
                                    <p>Phone Number</p>
                                    <input
                                        required
                                        className='border outline-blue-600 rounded w-full p-2 mt-1'
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <div className='w-full'>
                            <p>Email</p>
                            <input
                                required
                                className='border outline-blue-600 rounded w-full p-2 mt-1'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <p>Password</p>
                            <input
                                required
                                className='border outline-blue-600 rounded w-full p-2 mt-1'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base' type='submit'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                        {state === 'Sign Up' ? (
                            <p>
                                Already have an account?{' '}
                                <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
                                    Login here
                                </span>
                            </p>
                        ) : (
                            <p>
                                Create a new account?{' '}
                                <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
                                    Click here
                                </span>
                            </p>
                        )}
                    </>
                )}
            </form>
        </div>
    );
}

export default Login;