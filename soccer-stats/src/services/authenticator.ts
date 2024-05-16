import jwt from 'jsonwebtoken';
import { User, UserRole } from './types';
import { NextFunction } from 'express';

interface TokenPayload {
    id: string;
    role: UserRole;
}

const JWT_SECRET: string = process.env.JWT_SECRET as string;

const generateToken = (user: User): string => {
    const payload: TokenPayload = {
        id: user.id,
        role: user.roleUser,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export { generateToken };
