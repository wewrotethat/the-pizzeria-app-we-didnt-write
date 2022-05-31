import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 60,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model("User", UserSchema);
