import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name must be at least 3 characters long"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name must be at least 3 characters long"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone:{
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "Please provide a valid phone number"],
        minLength: [10, "Phone number must contain at least 10 digits"],
        maxLength: [15, "Phone number must not exceed 15 digits"]
    },
    dob:{
        type: String,
        required: [true, "DOB is required"],
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "User","Lawyer"]
    },
    lawyerDepartment:{
        type: String,
    },
    lawAvatar:{
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });
}

export const User = mongoose.model("User", userSchema);
