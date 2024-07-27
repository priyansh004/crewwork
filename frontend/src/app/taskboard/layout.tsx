"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar'; // Adjust import path
import PrivateRoute from '@/utils/PrivateRoute';
const TaskBoardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PrivateRoute>
            <div className="taskboard-layout flex flex-row w-screen h-screen gap-0">
                <div>
                    {children}
                </div>
            </div>
        </PrivateRoute>
    );
};

export default TaskBoardLayout;
