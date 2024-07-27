"use client";

import TaskArea from "@/components/TaskArea";
import TaskBoardLayout from "./layout";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";

const TaskBoard: React.FC = () => {
    const [showtaskadd, setshowtaskadd] = useState(false);
    const { currentUser } = useSelector((state: RootState) => state.user);
  

    useEffect(() => {
        if (showtaskadd) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showtaskadd]);
    // <div className="fixed inset-0 flex w-screen h-screen flex-col items-center overflow-hidden">
    //     <AddtaskCard />
    // </div>
    return (
        <TaskBoardLayout>

            <div className="flex w-screen h-screen overflow-hidden">
                <div className="w-[285px]">
                    <Sidebar />
                </div>
                <div className="w-[1px] h-full bg-[#DEDEDE]"></div>
                <div className="flex-1">
                    <TaskArea />
                </div>
            </div>

        </TaskBoardLayout>
    );
};

export default TaskBoard;
