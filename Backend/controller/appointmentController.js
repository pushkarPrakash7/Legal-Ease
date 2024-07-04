import {catchAsyncErrors} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {firstName, lastName, email, phone, dob, gender, appointment_date, department,lawyer_firstName, lawyer_lastName,hasVisited,address} = req.body;
    if(!firstName || !lastName ||  !email || !phone || !dob || !gender | !appointment_date || !department || !lawyer_firstName|| !lawyer_lastName || !address){
        return next(new ErrorHandler("Please fill all the fields in the form",400));
    }
    const isConflict = await User.find({
        firstName: lawyer_firstName,
        lastName: lawyer_lastName,
        role: "Lawyer",
        lawyerDepartment: department,
    })

    const user = await User.find({email});

    if(isConflict.length === 0){
        return next(new ErrorHandler("Lawyer Not found",400));
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Multiple Lawyers with provided data, Please contact via email or phone",400));
    }
    const lawyerId  = isConflict[0]._id;
    const clientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_date,
        department,
        lawyerId,
        clientId,
        lawyer:{
            firstName: lawyer_firstName,
            lastName: lawyer_lastName,
        },
        hasVisited,
        address,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully",
        appointment,
    });
})

export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
})

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Appointment Status Updated Successfully",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",404));
    }
    appointment = await Appointment.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Appointment Deleted Successfully",
    });
});