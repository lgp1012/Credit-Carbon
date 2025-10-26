import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['BUYER', 'EV_OWNER', 'CVA', 'ADMIN'], 
        default: 'BUYER' 
    },
    isEVOwner: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const User = mongoose.model("User", userSchema);

export default User;