import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";


export const isAdminAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        const token = req.cookies.adminToken;
        if (!token) {
            return next(
                new ErrorHandler("Dashboard User is not authenticated!", 400)
            );
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "Admin") {
            return next(
                new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
            );
        }
        next();
    }
);


export const isClientAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        const token = req.cookies.clientToken;
        if (!token) {
            return next(new ErrorHandler("User is not authenticated!", 400));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (req.user.role !== "User") {
            return next(
                new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
            );
        }
        next();
    }
);

