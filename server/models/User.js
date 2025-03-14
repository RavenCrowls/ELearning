const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true,
    },
    enrollments: {
        type: Array,
        default: [
            {
                course_id: String,
                progress: Number,
            },
        ],
    },
});

module.exports = mongoose.model("User", UserSchema);
