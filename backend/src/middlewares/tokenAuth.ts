import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.header('Authorization');
    const tokenMatch = authHeader?.match(/^(Bearer\s)?(.+)$/i);
    if (!tokenMatch?.[2]) {
        return res.status(401).json({error: 'Invalid authorization format'});
    }

    const token = tokenMatch[2];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({error: 'Invalid token'});
    }
}

export {authenticateToken}