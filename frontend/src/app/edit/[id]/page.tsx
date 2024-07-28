'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Image from "next/image";

// Import images
import close from "@asset/taskadd/close.png";
import full from "@asset/taskadd/full.png";
import share from "@asset/taskadd/share.png";
import fav from "@asset/taskadd/fav.png";
import status from "@asset/taskadd/status.png";
import pri from "@asset/taskadd/pri.png";
import dead from "@asset/taskadd/dead.png";
import pen from "@asset/taskadd/pen.png";
import plus from "@asset/taskadd/add.png";
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

// Define enums
 enum Status {
    Option1 = "to do",
    Option2 = "In progress",
    Option3 = "under review",
    Option4 = "finished"
}

 enum Priority {
    Option1 = "urgent",
    Option2 = "medium",
    Option3 = "low"
}

// Define the task schema
interface TaskFormData {
    _id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    deadline?: string; // Use string for form handling, convert to Date when sending to API
    userId: string
}


const Page: React.FC = () => {
    useAuth(); // Check if user is authenticated

    const { currentUser } = useAppSelector((state) => state.user);
    const [task, setTask] = useState<TaskFormData>({
        _id: '',
        title: '',
        description: '',
        status: Status.Option1,
        priority: Priority.Option2,
        deadline: '',
        userId: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams(); // Assuming the dynamic parameter is 'id'
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            const fetchTask = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/${id}`, {
                        withCredentials: true,
                    });
                    setTask(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch task');
                    setLoading(false);
                }
            };

            fetchTask();
        } else {
            router.push('/login'); // Redirect to login if the user is not authenticated
        }
    }, [currentUser, id, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {


            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/${id}`, task, {
                withCredentials: true,
            });

            if (response.status !== 200) {
                console.error('Failed to update task status');
                // Optionally, revert the state if the API call fails
            }
            router.push('/taskboard');

        } catch (error) {
            console.error('Error updating task status:', error);
            // Optionally, revert the state if the API call fails
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Special handling for date input
        if (name === 'deadline') {
            setTask((prevTask) => ({
                ...prevTask,
                [name]: value,
            }));
        } else {
            // Handle other input types
            setTask((prevTask) => ({
                ...prevTask,
                [name]: value,
            }));
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{ error } </p>;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"

        >

            <div className='w-screen  flex flex-row items-center justify-center h-screen bg-white' >
                <form onSubmit={handleUpdate} className=" self-center w-[670px] mt-4 px-2 py-6 flex flex-col h-full  " >
                    <h1 className='font-bold text-6xl  self-center m-3 p-2  ' > Edit Post </h1>

                    < div className="flex flex-col h-full gap-8 " >
                        <div className="flex flex-col gap-[27px] w-[622px]" >
                            <div className="flex flex-row justify-between" >
                                {/* ... (previous code for close, full, share, favorite buttons) ... */}
                                < div className="flex flex-row gap-4 items-center " >
                                    <Link href="/taskboard" >
                                        <Image src={close} alt="close" width={24} height={24} className='h-6 w-6' />

                                    </Link>
                                    < Image src={full} alt="full" width={24} height={24} className='h-6 w-6' />
                                </div>
                                < div className="flex flex-row gap-4" >
                                    <div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]" >
                                        <p className="font-normal text-[16px] leading-[19.36px] text-[#797979]" > Share </p>
                                        < Image src={share} alt="share" width={24} height={24} className='h-6 w-6' />
                                    </div>
                                    < div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]" >
                                        <p className="font-normal text-[16px] leading-[19.36px] text-[#797979]" > Favourite </p>
                                        < Image src={fav} alt="favorite" width={24} height={24} className='h-6 w-6' />
                                    </div>
                                </div>
                            </div>
                            < div className="flex flex-col gap-[38px]" >
                                <div className="flex flex-col gap-8" >
                                    <input
                                        type="text"
                                        name="title"
                                        value={task.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        required
                                        className="font-semibold leading-[57.6px] text-[48px] text-[#CCCCCC] focus:outline-none"
                                    />
                                    <div className="flex flex-row gap-[60px]" >
                                        <div className="flex flex-col gap-8" >
                                            {/* ... (previous code for status, priority, deadline, description icons) ... */}
                                            < div className="flex flex-row gap-6 items-center" >
                                                <Image src={status} alt="status" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]" > Status </p>
                                            </div>
                                            < div className="flex flex-row gap-6 items-center" >
                                                <Image src={pri} alt="priority" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]" > Priority </p>
                                            </div>
                                            < div className="flex flex-row gap-6 items-center" >
                                                <Image src={dead} alt="deadline" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]" > Deadline </p>
                                            </div>
                                            < div className="flex flex-row gap-6 items-center" >
                                                <Image src={pen} alt="description" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]" > Description </p>
                                            </div>
                                        </div>
                                        < div className="flex flex-col gap-8" >
                                            <select
                                                name="status"
                                                value={task.status}
                                                onChange={handleInputChange}
                                                required
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            >
                                                {
                                                    Object.values(Status).map((statusOption) => (
                                                        <option key={statusOption} value={statusOption} > {statusOption} </option>
                                                    ))
                                                }
                                            </select>
                                            < select
                                                name="priority"
                                                value={task.priority}
                                                onChange={handleInputChange}
                                                required
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            >
                                                {
                                                    Object.values(Priority).map((priorityOption) => (
                                                        <option key={priorityOption} value={priorityOption} > {priorityOption} </option>
                                                    ))
                                                }
                                            </select>
                                            < input
                                                type="date"
                                                name="deadline"
                                                value={task.deadline}
                                                onChange={handleInputChange}
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            />
                                            <textarea
                                                name="description"
                                                value={task.description}
                                                onChange={handleInputChange}
                                                placeholder="Add description"
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                < div className="flex flex-row gap-[23px] items-center" >
                                    <Image src={plus} alt="add" width={24} height={24} className='h-6 w-6' />
                                    <p className="font-normal text-black leading-[19.36px] text-[16px]" > Add custom property </p>
                                </div>
                            </div>
                        </div>
                        < div className="h-[1px] bg-[#DEDEDE] w-full" > </div>
                        < button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
