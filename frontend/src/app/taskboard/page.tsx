"use client"

import TaskArea from "@/components/TaskArea"
import TaskBoardLayout from "./layout"
import Sidebar from "@/components/Sidebar"
import { useState } from "react"
import AddtaskCard from "@/components/AddtaskCard"
const TaskBoard: React.FC = () => {

    const [showtaskadd, setshowtaskadd] = useState(false);

    return (
        <TaskBoardLayout>
            {
                showtaskadd ? (
                        <div className="flex w-screen h-screen flex-col items-center">
                           <AddtaskCard/>
                        </div>
                ) : (
                    <div className="flex w-screen h-screen flex-row">
                        <div className="w-[285px]"> <Sidebar /></div>
                        <div className="w-[1px] h-full bg-[#DEDEDE]"></div>
                        <div className="flex-1"><TaskArea /></div>
                    </div>


                )
            }
        </TaskBoardLayout>
    )
}

export default TaskBoard