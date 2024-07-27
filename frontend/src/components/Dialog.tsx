'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

// Define enums
export enum Status {
    Option1 = "to do",
    Option2 = "In progress",
    Option3 = "under review",
    Option4 = "finished"
}

export enum Priority {
    Option1 = "urgent",
    Option2 = "medium",
    Option3 = "low"
}

// Define the task schema
interface TaskFormData {
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    deadline?: string;
}

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    initialStatus?: Status; // Make initialStatus required
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children, initialStatus = Status.Option1  }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        status: initialStatus ,
        priority: Priority.Option2,
        deadline: "",
    });

    // Use useEffect to update formData when initialStatus changes
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            status: initialStatus
        }));
    }, [initialStatus]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                deadline: formData.deadline ? new Date(formData.deadline) : undefined,
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/`, dataToSend, {
                withCredentials: true,
            });
            console.log('Task created:', response.data);
            router.push('/taskboard');
            onClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
            role="dialog"
            aria-labelledby="dialog-title"
            aria-modal="true"
        >
            <div className='w-screen flex flex-row items-center justify-center h-screen bg-white'>
                <form onSubmit={handleSubmit} className="self-center w-[670px] mt-4 px-2 py-6 flex flex-col h-full">
                    <div className="flex flex-col h-full gap-8">
                        <div className="flex flex-col gap-[27px] w-[622px]">
                            <div className="flex flex-row justify-between">
                                {/* Previous code for close, full, share, favorite buttons */}
                                <div className="flex flex-row gap-4 items-center">
                                    <button type="button" onClick={onClose}>
                                        <Image src={close} alt="close" width={24} height={24} className='h-6 w-6' />
                                    </button>
                                    <Image src={full} alt="full" width={24} height={24} className='h-6 w-6' />
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]">
                                        <p className="font-normal text-[16px] leading-[19.36px] text-[#797979]">Share</p>
                                        <Image src={share} alt="share" width={24} height={24} className='h-6 w-6' />
                                    </div>
                                    <div className="flex flex-row items-center h-10 gap-[14px] p-2 rounded bg-[#F4F4F4]">
                                        <p className="font-normal text-[16px] leading-[19.36px] text-[#797979]">Favourite</p>
                                        <Image src={fav} alt="favorite" width={24} height={24} className='h-6 w-6' />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[38px]">
                                <div className="flex flex-col gap-8">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Title"
                                        required
                                        className="font-semibold leading-[57.6px] text-[48px] text-[#CCCCCC] focus:outline-none"
                                    />
                                    <div className="flex flex-row gap-[60px]">
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-row gap-6 items-center">
                                                <Image src={status} alt="status" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]">Status</p>
                                            </div>
                                            <div className="flex flex-row gap-6 items-center">
                                                <Image src={pri} alt="priority" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]">Priority</p>
                                            </div>
                                            <div className="flex flex-row gap-6 items-center">
                                                <Image src={dead} alt="deadline" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]">Deadline</p>
                                            </div>
                                            <div className="flex flex-row gap-6 items-center">
                                                <Image src={pen} alt="description" width={24} height={24} className='h-6 w-6' />
                                                <p className="text-[16px] font-normal leading-[19.36px] text-[#666666]">Description</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-8">
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                required
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            >
                                                {Object.values(Status).map((statusOption) => (
                                                    <option key={statusOption} value={statusOption}>{statusOption}</option>
                                                ))}
                                            </select>
                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                                required
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            >
                                                {Object.values(Priority).map((priorityOption) => (
                                                    <option key={priorityOption} value={priorityOption}>{priorityOption}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="date"
                                                name="deadline"
                                                value={formData.deadline}
                                                onChange={handleInputChange}
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            />
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Add description"
                                                className="text-[16px] font-normal leading-[24px] text-[#C1BDBD] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-[23px] items-center">
                                    <Image src={plus} alt="add" width={24} height={24} className='h-6 w-6' />
                                    <p className="font-normal text-black leading-[19.36px] text-[16px]">Add custom property</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-[1px] bg-[#DEDEDE] w-full"></div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Create Task
                        </button>
                        {children}
                    </div>
                </form>
            </div>
        </div>,
        document.body // Render the dialog at the end of the body
    );
};

export default Dialog;
