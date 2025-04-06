import mongoose, { Document, Schema } from 'mongoose';

interface IEnrollment {
    COURSE_ID: string;
    PROGRESS: number;
}

export interface IUser extends Document {
    USER_ID: string;
    NAME: string;
    EMAIL: string;
    AVATAR?: string;
    BIO?: string;
    JOIN_DATE: Date;
    STATUS: boolean;
    ENROLLMENTS: IEnrollment[];
}

const userSchema: Schema = new Schema({
    USER_ID: {
        type: String,
        required: true,
        unique: true,
    },
    NAME: {
        type: String,
        required: true,
    },
    EMAIL: {
        type: String,
        required: true,
        unique: true,
    },
    AVATAR: {
        type: String,
        default: null,
    },
    BIO: {
        type: String,
        default: null,
    },
    JOIN_DATE: {
        type: Date,
        default: Date.now,
    },
    STATUS: {
        type: Boolean,
        default: true,
    },
    ENROLLMENTS: {
        type: [{
            COURSE_ID: { type: String, required: true },
            PROGRESS: { type: Number, required: true, min: 0, max: 100 },
        }],
        default: [],
    },
}, { versionKey: false });

const User = mongoose.model<IUser>('User', userSchema);

export default User;