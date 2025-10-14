import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum:['F', 'M', 'O'],
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    verifyToken: String,
    verifyTokenExpiry: Date
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User