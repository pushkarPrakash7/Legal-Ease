import { parseAst } from "vite";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";  // Use named import
import {generateToken} from "../utils/jwt_token.js";
import cloudinary from "cloudinary";

export const clientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, password, gender, role } = req.body;
    if(!firstName || !lastName || !email || !phone || !dob || !password || !gender || !role){
        return next(new ErrorHandler("Please fill all the fields in the form",400));
    }
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User Already Registered",400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        password,
        gender,
        role
    });
    generateToken(user, "User registered successfully", 200, res);
});

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email, password, confirmPassword, role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all fields to Login",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm password do not match",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found!",400));
    }
    generateToken(user, "Logged In successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const { firstName, lastName, email, phone, dob, password, gender} = req.body;
    if(!firstName || !lastName || !email || !phone || !dob || !password || !gender){
        return next(new ErrorHandler("Please fill all the fields in the form",400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this Email already Exists!`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        password,
        gender,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered"
    })
})

export const getAllLawyers = catchAsyncErrors(async(req,res,next)=>{
    const lawyers = await User.find({role: "Lawyer"});
    res.status(200).json({
        success: true,
        lawyers,
    });
})

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const users = req.user;
    res.status(200).json({
        success: true,
        users,
    });
})

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Admin Logged Out Successfully"
    })
})

export const logoutClient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("clientToken","",{
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Client Logged Out Successfully"
    })
})

export const addnewLawyer = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Lawyer Avatar Required",400));
    }
    const {lawAvatar} = req.files;
    const allowedFormats = ["image/png","image/jpeg","image/webp","image/jpg"];
    if(!allowedFormats.includes(lawAvatar.mimetype)){
        return next(new ErrorHandler("Invalid File Format! Only PNG, JPEG, and WEBP are allowed.",400));
    }
    const {firstName, lastName, email, phone, password, gender, dob, lawyerDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !lawyerDepartment){
        return next(new ErrorHandler("Please provide all the necessary details", 400));
    } 
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(lawAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error: ",cloudinaryResponse.error || "Unknown Vloudinary Error");
    }
    const lawyer = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        password,
        gender,
        role: "Lawyer",
        lawyerDepartment,
        lawAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "New Lawyer Registered",
        lawyer
    });
})