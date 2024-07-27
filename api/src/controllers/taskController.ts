import { Request, Response, NextFunction } from 'express';
import TaskModel from '../models/Task';
import { createError } from '../utils/errorhandler';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT token
const verifyToken = (token: string): { id: string } | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    } catch (error) {
        return null;
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, status, priority, deadline } = req.body;

    if (!title || !status) {
        return next(createError("Title and status are mandatory", 400));
    }

    try {
        const token = req.cookies.access_token;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return next(createError("Unauthorized", 401));
        }

        const newTask = new TaskModel({
            title,
            description,
            status,
            userId: decodedToken.id,
            priority,
            deadline
        });

        const task = await newTask.save();
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return next(createError("Unauthorized", 401));
        }

        const tasks = await TaskModel.find({ userId: decodedToken.id });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return next(createError("Unauthorized", 401));
        }

        const task = await TaskModel.findOne({ _id: req.params.id, userId: decodedToken.id });
        if (!task) {
            return next(createError("Task not found", 404));
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, status, priority, deadline } = req.body;

    if (!title || !status) {
        return next(createError("Title and status are mandatory", 400));
    }

    try {
        const token = req.cookies.access_token;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return next(createError("Unauthorized", 401));
        }

        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: req.params.id, userId: decodedToken.id },
            { title, description, status, priority, deadline },
            { new: true }
        );

        if (!updatedTask) {
            return next(createError("Task not found", 404));
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return next(createError("Unauthorized", 401));
        }

        const deletedTask = await TaskModel.findOneAndDelete({ _id: req.params.id, userId: decodedToken.id });
        if (!deletedTask) {
            return next(createError("Task not found", 404));
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};