import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { Users } from "../../../database/models/Users.model";
import { TokenUserInfo } from "../../../interface/Auth";

const authenticateToken = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.header('Authorization');
    const tokenMatch = authHeader?.match(/^(Bearer\s)?(.+)$/i);
    if (!tokenMatch?.[2]) {
        return res.status(401).json({message: 'Invalid authorization format'});
    }

    const token = tokenMatch[2];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenUserInfo;
        const userResult = await Users.findOne({where: {
            username: decoded.username
        }})
        if (!userResult || ((userResult.role == "admin") != decoded.isAdmin)) {
            throw {message: "Invalid token user"};
        }
        res.locals.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: err.message});
    }
}

export {authenticateToken}