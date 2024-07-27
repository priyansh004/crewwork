"use client"

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { signInSuccess, signInFailure } from '@/redux/user/userSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch } from "@/redux/store"; // You'll need to create this type
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import eye from '@asset/eye.png';
import Link from 'next/link';
const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDown = () => {
        setShowPassword(true);
    };

    const handleMouseUp = () => {
        setShowPassword(false);
    };

    const handleMouseLeave = () => {
        setShowPassword(false);
    };

    const navigate = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true
                }
            );

            // If the request is successful, the response data will be the user object
            dispatch(signInSuccess(response.data));
            navigate.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Axios error
                const axiosError = error as AxiosError<{ message: string }>;
                if (axiosError.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(axiosError.response.data.message || 'An error occurred during login');
                } else if (axiosError.request) {
                    // The request was made but no response was received
                    setError('No response received from server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError('Error setting up the request');
                }
                dispatch(signInFailure(axiosError.response?.data.message || 'Login failed'));
            } else {
                // Non-Axios error
                setError('An unknown error occurred');
                dispatch(signInFailure('An unknown error occurred'));
            }
        }
    };



    return (
        <div style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%,#AFA3FF 100%)',
        }}
            className='flex flex-col items-center w-screen h-screen'
        >
            <div className=' flex flex-col mt-[120px] border rounded-2xl gap-8 p-[60px] border-[#CECECE]'
                style={{
                    background: 'linear-gradient(180deg, #F7F7F7 0%, #F0F0F0 100%)',
                }}
            >
                <div className='flex flex-row  justify-center '>

                    <p className='font-semibold text-[48px]  align-middle'>
                        Welcome to <span className='text-[#4534AC]'>Workflo</span>!
                    </p>
                </div>
                <form onSubmit={handleEmailLogin}>
                    <div className='flex flex-col gap-[22px]'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-row'>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    required
                                    className='w-[528px] rounded-lg gap-[10px] px-4 py-3 bg-[#EBEBEB]'
                                />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-lg bg-[#EBEBEB] relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className="w-full rounded-lg px-4 py-3 bg-transparent focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseLeave}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                                >
                                    <Image
                                        src={eye}
                                        alt="Toggle password visibility"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </div>
                        </div>
                        <button className='border rounded-lg gap-[10px] p-2 flex flex-row justify-center'
                            style={{
                                background:
                                    'linear-gradient(180deg, #4C38C2 0%, #2F2188 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))',
                                border: '1px solid',
                                borderImageSource: 'linear-gradient(360deg, #4B36CC 0%, #9C93D4 107.69%)',
                                borderImageSlice: 1,
                                boxShadow: '0px 4px 16px 0px #0000001A, 0px 12px 16px 0px #BABABA33 inset'
                            }}

                            type='submit'
                        >
                            <p className='font-normal text-[20px] leading-[24.2px] text-white'>Login</p>
                        </button>
                    </div>
                </form>
                <Link href='/register'>
                    <div className='flex flex-row justify-center'>
                        <p className='font-normal text-[20px] leading-[24.2px] text-[#606060] '>Don’t have an account? Create a <span className='text-[#0054A1]'>new account</span>.</p>
                    </div>
                </Link>
            </div>

        </div>


    );
};

export default Login;