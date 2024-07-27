import Joi from 'joi';
import { Status, Priority } from '../models/Task';

export const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().valid(...Object.values(Status)).required(),
    userId: Joi.string().hex().length(24).required(),
    priority: Joi.string().valid(...Object.values(Priority)),
    deadline: Joi.date()
});

export const updateTaskSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid(...Object.values(Status)),
    priority: Joi.string().valid(...Object.values(Priority)),
    deadline: Joi.date()
});