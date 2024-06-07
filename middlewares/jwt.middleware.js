import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'; // Ensure to import jwt if not already done
import { errorHandler } from "../helpers/Error.js";
export async function checkAuth(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Please login first. Not Logged in.'));
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await userModel.findById(verify.id);
        
        if (!user) {
            return next(errorHandler(401, 'Please login first. Not Logged in.'));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(errorHandler(401, 'Please login first. Not Logged in.'));
    }
}
