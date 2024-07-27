import React from 'react';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';
import clock from '@asset/task/clock.png';
import { Priority, Status } from './TaskArea';  // Assuming these are defined in TaskArea.tsx
import trash from '@asset/trash.svg'
import edit from "@asset/edit.svg"
import axios from 'axios';
import Link from 'next/link';

interface TaskCardProps {
    task: {
        _id: string;
        title: string;
        description?: string;
        status: Status;
        priority: Priority;
        deadline?: string;
        createdAt?: string;
    };
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    const deleteTask = async () => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/${task._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true
                }
            );
            const data = response.data;
            console.log('Task deleted successfully:', data);
            return data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error; // Rethrow the error if you need to handle it further up the call stack
        }
    };
    const formatDate = (dateString?: string): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const timeAgo = (dateString: string): string => {
        const now = new Date();
        const createdAt = new Date(dateString);
        const differenceInMs = now.getTime() - createdAt.getTime();
        const differenceInHours = differenceInMs / (1000 * 60 * 60);
        const differenceInDays = differenceInHours / 24;

        if (differenceInDays > 1) {
            return `${Math.floor(differenceInDays)} day${Math.floor(differenceInDays) > 1 ? 's' : ''} ago`;
        } else if (differenceInHours > 1) {
            return `${Math.floor(differenceInHours)} hour${Math.floor(differenceInHours) > 1 ? 's' : ''} ago`;
        } else {
            return 'Less than an hour ago';
        }
    };

    const getPriorityColor = (priority: Priority): string => {
        switch (priority) {
            case Priority.Option1:
                return 'bg-[#FF6B6B]';
            case Priority.Option2:
                return 'bg-[#FFD700]';
            case Priority.Option3:
                return 'bg-[#90EE90]';
            default:
                return 'bg-gray-400';
        }
    };

    return (

        <div

            className="flex flex-col rounded-lg border border-[#DEDEDE] bg-[#F9F9F9] gap-4 px-[14px] py-[13px]"
        >
            <div className="flex flex-col gap-[13px]">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-[16px] text-[#606060] leading-[19.36px]">
                        {task.title}
                    </p>
                    <p className="font-normal text-[14px] text-[#797979] leading-[16.94px] line-clamp-3">
                        {task.description}
                    </p>
                </div>
                <div className={`inline-flex items-center rounded-lg px-[6px] py-2 ${getPriorityColor(task.priority)} w-[55px] h-[27px]`}>
                    <p className="font-normal self-center text-justify text-[12px] text-[#FFFFFF] leading-[14.52px]">
                        {task.priority}
                    </p>
                </div>
                {task.deadline && (
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={clock}
                            alt="clock"
                            width={24}
                            height={24}
                            className="h-6 w-6"
                        />
                        <p className="font-semibold text-[14px] leading-[16.94px] text-[#606060]">
                            {formatDate(task.deadline)}
                        </p>
                    </div>
                )}
            </div>
            <div className='flex flex-row justify-between'>
                <p className="font-medium text-[14px] leading-[16.94px] text-[#797979]">
                    {task.createdAt ? timeAgo(task.createdAt) : 'Unknown time'}
                </p>
                <div className='flex flex-row gap-2 mr-3'>
                    <Link href={`/edit/${task._id}`}>
                            <Image
                                src={edit}
                                alt="clock"
                                width={24}
                                height={24}
                                className="h-4 w-4"
                            />
                    </Link>
                    <button onClick={deleteTask}>
                        <Image
                            src={trash}
                            alt="clock"
                            width={24}
                            height={24}
                            className="h-4 w-4"
                        />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default TaskCard;