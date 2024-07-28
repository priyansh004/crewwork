"use client";

import React, { useEffect, useState,useCallback } from "react";
import Image from "next/image";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import axios from "axios";
import Menubar from "./Menubar";
import TaskCard from "./TaskCard";
import Balckaddcard from "./Blackaddcard";
import info1 from '@asset/taskarea/info1.png';
import info2 from '@asset/taskarea/info2.png';
import info3 from '@asset/taskarea/info3.png';
import que from '@asset/taskarea/que.png';
import bar from '@asset/task/bar.png';
import { DndContext } from '@/context/Dnd'
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dialog from "./Dialog";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
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

const info = [
    { src: info1, title: 'Introducing tags', text: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.' },
    { src: info2, title: 'Share Notes Instantly', text: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.' },
    { src: info3, title: 'Access Anywhere', text: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer." },
];


interface TaskFormData {
    _id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    deadline?: string;
}

interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

interface BoardState {
    tasks: { [key: string]: TaskFormData };
    columns: { [key: string]: Column };
    columnOrder: string[];
}

const TaskArea: React.FC = () => {
    useAuth(); // Check if user is authenticated
    const router= useRouter();
    const { currentUser } = useSelector((state: RootState) => state.user);
  
    const [showTaskAdd, setShowTaskAdd] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(undefined);

    const [boardState, setBoardState] = useState<BoardState>({
        tasks: {},
        columns: {},
        columnOrder: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/`, {
                withCredentials: true,
            });
            const tasks = response.data;
            initializeBoardState(tasks);
            setLoading(false);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                // Redirect to login page if status is 401 in the error response
                router.push('/login');
            } else {
                setError(error.message || "An error occurred");
            }
            setLoading(false);
        }
    }, [router]);

    const openDialog = (status: Status) => {
        setSelectedStatus(status);
        setShowTaskAdd(true);
    };
    const closeDialog = () => {
        setShowTaskAdd(false);
        setSelectedStatus(undefined);
    };

    
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); // Dependency array with fetchTasks ensures it runs only once initially

    // Effect to re-run fetchTasks when closeDialog is called
    useEffect(() => {
        if (!showTaskAdd) {
            fetchTasks(); // Re-fetch tasks when dialog is closed
        }
    }, [showTaskAdd, fetchTasks,closeDialog]); //
  
   

    const initializeBoardState = (tasks: TaskFormData[]) => {
        const newState: BoardState = {
            tasks: {},
            columns: {
                'column-1': { id: 'column-1', title: 'to do', taskIds: [] },
                'column-2': { id: 'column-2', title: 'In progress', taskIds: [] },
                'column-3': { id: 'column-3', title: 'under review', taskIds: [] },
                'column-4': { id: 'column-4', title: 'finished', taskIds: [] },
            },
            columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
        };

        tasks.forEach(task => {
            newState.tasks[task._id] = task;
            switch (task.status) {
                case Status.Option1:
                    newState.columns['column-1'].taskIds.push(task._id);
                    break;
                case Status.Option2:
                    newState.columns['column-2'].taskIds.push(task._id);
                    break;
                case Status.Option3:
                    newState.columns['column-3'].taskIds.push(task._id);
                    break;
                case Status.Option4:
                    newState.columns['column-4'].taskIds.push(task._id);
                    break;
            }
        });

        setBoardState(newState);
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = boardState.columns[source.droppableId];
        const finish = boardState.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...boardState,
                columns: {
                    ...boardState.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setBoardState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...boardState,
            columns: {
                ...boardState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setBoardState(newState);

        // Update task status in the backend
        try {
            const task = boardState.tasks[draggableId];
            const updatedTask: TaskFormData = {
                ...task,
                status: finish.title as Status, // Assuming column id corresponds to Status
            };

            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/task/${draggableId}`, updatedTask, {
                withCredentials: true,
            });

            if (response.status !== 200) {
                console.error('Failed to update task status');
                // Optionally, revert the state if the API call fails
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            // Optionally, revert the state if the API call fails
        }
    };

    function getStatusFromColumnTitle(title: string): Status {
        switch (title.toLowerCase()) {
            case 'to do':
                return Status.Option1;
            case 'in progress':
                return Status.Option2;
            case 'under review':
                return Status.Option3;
            case 'finished':
                return Status.Option4;
            default:
                throw new Error(`Unknown status: ${title}`);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div className="flex flex-col flex-1 h-full w-full p-4 gap-4 bg-[#F4F4F4] ">

            <div className="flex flex-col w-full gap-4">
                {/* Title div */}
                <div className="flex flex-row items-center w-full">
                    <p className="font-semibold text-5xl leading-[57.6px] flex-grow">
                        Good morning, {currentUser.fullname.split(' ')[0]}!
                    </p>
                    <div className="flex flex-row items-end ml-4">
                        <p className="font-normal text-[16px] text-[#080808] leading-[19.36px] mr-2">
                            Help & feedback
                        </p>
                        <Image
                            src={que}
                            alt="que"
                            width={24}
                            height={24}
                            className='h-6 w-6'
                        />
                    </div>
                </div>
                {/* Info cards */}
                <div className="flex flex-row gap-2">
                    {info.map((item, index) => (
                        <div key={index} className="flex items-center bg-[#FFFFFF] flex-row rounded-lg p-4 gap-[10px] border border-[#F4F4F4]">
                            <div>
                                <Image
                                    src={item.src}
                                    alt="info"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] leading-[19.36px] font-semibold text-[#757575]">{item.title}</p>
                                <p className="font-normal leading-[16.94px] text-[14px] text-[#868686]">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Menu bar */}
                <Menubar />
            </div>








            {/* //dnd  */}




            {/* <DndContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 w-full h-full p-4 gap-4 rounded-lg bg-[#FFFFFF]">
                    <TaskColumn  title="To do" tasks={getTasksByStatus(Status.Option1)} status={Status.Option1} />
                    <TaskColumn title="In progress" tasks={getTasksByStatus(Status.Option2)} status={Status.Option2} />
                    <TaskColumn title="Under Review" tasks={getTasksByStatus(Status.Option3)} status={Status.Option3} />
                    <TaskColumn title="Finished" tasks={getTasksByStatus(Status.Option4)} status={Status.Option4} />
                </div>
            </DndContext> */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 w-full h-full p-4 gap-4 rounded-lg bg-[#FFFFFF]  overflow-y-auto">
                    {boardState.columnOrder.map((columnId) => {
                        const column = boardState.columns[columnId];
                        const tasks = column.taskIds.map(taskId => boardState.tasks[taskId]);
                        const columnStatus = getStatusFromColumnTitle(column.title);

                        return (
                            <Droppable key={column.id} droppableId={column.id}>
                                {(provided) => (
                                    <div
                                        className="col-span-1 w-full flex flex-col self-start gap-4"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className="flex flex-row w-full  justify-between px-2">
                                            <h2 className="font-normal text-[20px] text-[#555555] leading-[24.2px]">{column.title}</h2>
                                            <Image
                                                src={bar}
                                                alt="que"
                                                width={24}
                                                height={24}
                                                className='h-6 w-6'
                                            />
                                        </div>
                                        {tasks.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className=""
                                                    >
                                                        <TaskCard task={task} index={index} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        <button onClick={() => openDialog(column.title as Status)}>
                                            <Balckaddcard />

                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>
            <Dialog isOpen={showTaskAdd} onClose={closeDialog}
                initialStatus={selectedStatus}
            >
                <></>
            </Dialog>
        </div>
    );
};

export default TaskArea;
