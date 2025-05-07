import mongoose, { Document, Schema } from 'mongoose';

export interface ILecture extends Document {
    COURSE_ID: string;
    LECTURE_ID: string;
    TITLE: string;
    ORDER: number;
    STATUS: boolean;
}

const lectureSchema: Schema = new Schema({
    COURSE_ID: {
        type: String,
        required: true
    },
    LECTURE_ID: {
        type: String,
        required: true,
        unique: true
    },
    TITLE: {
        type: String,
        required: true
    },
    ORDER: {
        type: Number,
        required: true
    },
    STATUS: {
        type: Boolean,
        default: true
    }
}, { versionKey: false });

const Lecture = mongoose.model<ILecture>('Lecture', lectureSchema);
export default Lecture;