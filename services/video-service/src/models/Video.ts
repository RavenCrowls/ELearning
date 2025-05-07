import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
    LECTURE_ID: string;
    VIDEO_ID: string;
    TITLE: string;
    DURATION: string;
    URL: string;
    STATUS: boolean;
}

const videoSchema: Schema = new Schema({
    LECTURE_ID: {
        type: String,
        required: true,
    },
    VIDEO_ID: {
        type: String,
        required: true,
        unique: true,
    },
    TITLE: {
        type: String,
        required: true,
    },
    DURATION: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },
    STATUS: {
        type: Boolean,
        default: true,
    },
}, { versionKey: false });

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video; 