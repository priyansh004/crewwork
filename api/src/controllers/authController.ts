import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/errorhandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, password,  } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return next(createError("User already exists", 400));
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            fullname,
            email,
            password: hashPassword,
        });

        const user = await newUser.save();
        const { password: pass, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const validUser = await UserModel.findOne({ email });
        if (!validUser) {
            return next(createError("User not found", 404));
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(createError("Invalid password", 400));
        }

        const token = jwt.sign(
            { id: validUser._id},
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        const { password: pass, ...userWithoutPassword } = validUser.toObject();

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};
