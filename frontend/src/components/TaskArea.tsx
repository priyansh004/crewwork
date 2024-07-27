"use client";

import Image, { StaticImageData } from "next/image";
import info1 from '@asset/taskarea/info1.png';
import info2 from '@asset/taskarea/info2.png';
import info3 from '@asset/taskarea/info3.png';
import que from '@asset/taskarea/que.png';
import Menubar from "./Menubar";
import TaskCard from "./TaskCard";
import clock from '@asset/task/clock.png';
import bar from '@asset/task/bar.png';
import { useState } from "react";
type Info = {
    src: StaticImageData;
    title: string;
    text: string;

};

const info: Info[] = [
    { src: info1, title: 'Introducing tags', text: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.' },
    { src: info2, title: 'Share Notes Instantly', text: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.' },
    { src: info3, title: 'Access Anywhere', text: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer." },
];

const TaskArea: React.FC = () => {

    return (
        <>

            <div className="flex flex-col flex-1 h-full w-full p-4 gap-4 bg-[#F4F4F4]">
                <div className="flex flex-col w-full  gap-4 ">
                    {/* Title div*/}
                    <div className="flex flex-row items-center w-full">
                        <p className="font-semibold text-5xl leading-[57.6px] flex-grow">
                            Good morning, Joe!
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
                    {/* infocards*/}

                    <div className="flex flex-row gap-2">
                        {info.map((info, index) => (
                            <div key={index} className="flex items-center bg-[#FFFFFF] flex-row rounded-lg p-4 gap-[10px] border border-[#F4F4F4]">
                                <div>
                                    <Image
                                        src={info.src}
                                        alt="que"

                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] leading-[19.36px] font-semibold text-[#757575]">{info.title}</p>
                                    <p className="font-normal leading-[16.94px] text-[14px] text-[#868686]">
                                        {info.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Menu bar*/}
                    <Menubar />
                </div >
                <div className="flex w-full h-full flex-row p-4 gap-4 rounded-lg bg-[#FFFFFF] justify-evenly">
                    <div className="flex flex-col self-start gap-4 ">
                        <div className="flex flex-row  justify-between px-1">
                            <p className="font-normal text-[20px] leading-[24.2px] text-[#555555] ">To do</p>
                            <Image
                                src={bar}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                        </div>
                        <TaskCard />
                    </div>
                    <div className="flex flex-col self-start gap-4 ">
                        <div className="flex flex-row  justify-between px-1">
                            <p className="font-normal text-[20px] leading-[24.2px] text-[#555555] ">In progress</p>
                            <Image
                                src={bar}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                        </div>
                        <TaskCard />
                    </div>
                    <div className="flex flex-col self-start gap-4 ">
                        <div className="flex flex-row  justify-between px-1">
                            <p className="font-normal text-[20px] leading-[24.2px] text-[#555555] ">Under Review</p>
                            <Image
                                src={bar}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                        </div>
                        <TaskCard />
                    </div>
                    <div className="flex flex-col self-start gap-4 ">
                        <div className="flex flex-row  justify-between px-1">
                            <p className="font-normal text-[20px] leading-[24.2px] text-[#555555] ">Finished</p>
                            <Image
                                src={bar}
                                alt="plus"
                                width={24}
                                height={24}
                                className='h-6 w-6'
                            />
                        </div>
                        <TaskCard />
                    </div>

                </div>
            </div >

        </>
    )
}

export default TaskArea