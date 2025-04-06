import mongoose, { Document, Schema } from 'mongoose';

interface IEnrollment {
    course_id: string;
    progress: number;
}

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    join_date: Date;
    status: boolean;
    enrollments: IEnrollment[];
}

const userSchema: Schema = new Schema({
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
        type: [{
            course_id: String,
            progress: Number,
        }],
        default: [],
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;