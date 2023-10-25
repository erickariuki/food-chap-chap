import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: 6,
            required: true
        },
        profilePic: {
            type: String,
            default: '',
            // required: true
        },
        followers: {
            type: [String],
            default: []
        },
        following: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
