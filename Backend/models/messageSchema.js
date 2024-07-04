import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: [3, "First Name must Contain At least 3 Characters"]
    },
    lastName:{
        type: String,
        required: true,
        minlength: [3, "Last Name must Contain At least 3 Characters"]
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
    message:{
        type: String,
        required: true,
        minlength: [10, "Message must Contain At least 10 Characters"]
    }
});

export const Message = mongoose.model('Message',messageSchema);