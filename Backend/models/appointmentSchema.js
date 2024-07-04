import mongoose from "mongoose";
import validator from "validator";

const AppointmentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: [3, "First Name must be at least 3 characters long"]
    },
    lastName:{
        type: String,
        required: true,
        minlength: [3, "Last Name must be at least 3 characters long"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    phone:{
        type: String,
        required: true,
        minlength: [10, "Phone Number must Contain At least 10 Digits"],
        maxlength: [10, "Phone Number must Contain At most 10 Digits"],
    },
    dob:{
        type: String,
        required: true,
        minlength: [10, "Date of Birth must be in the format dd/mm/yyyy"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    appointment_date:{
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    lawyer:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    hasVisited:{
        type: Boolean,
        default : false,
    },
    lawyerId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    clientId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ["Pending", "Rejected", "Accepted"],
        default: "Pending"
    },
});

export const Appointment = mongoose.model('Appointment',AppointmentSchema);