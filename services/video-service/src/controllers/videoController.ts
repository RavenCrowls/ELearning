import { Request, Response } from 'express';
import Video, { IVideo } from '../models/Video';

class VideoController {
    async createVideo(req: Request, res: Response) {
        try {
            const {
                LECTURE_ID,
                VIDEO_ID,
                TITLE,
                DURATION,
                URL,
                FREE_TRIAL,
                STATUS
            } = req.body;
            const newVideo = new Video({
                LECTURE_ID,
                VIDEO_ID,
                TITLE,
                DURATION,
                URL,
                FREE_TRIAL,
                STATUS
            });
            await newVideo.save();
            res.status(201).json(newVideo);
        } catch (error) {
            res.status(500).json({ message: "Error creating video", error });
        }
    }

    async getAllVideos(req: Request, res: Response) {
        try {
            const videoList = await Video.find({ STATUS: 1 });
            res.status(200).json(videoList);
        } catch (error) {
            res.status(500).json({ message: "Error getting videos", error });
        }
    }

    async getVideo(req: Request, res: Response) {
        try {
            const { videoId } = req.params;
            const video = await Video.findOne({ VIDEO_ID: videoId, STATUS: 1 });
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            res.status(200).json(video);
        } catch (error) {
            res.status(500).json({ message: "Error getting video", error });
        }
    }

    async updateVideo(req: Request, res: Response) {
        try {
            const { videoId } = req.params;
            const {
                TITLE,
                DURATION,
                URL,
                FREE_TRIAL
            } = req.body;
            const data = {
                TITLE,
                DURATION,
                URL,
                FREE_TRIAL
            };
            const updatedVideo = await Video.findOneAndUpdate(
                { VIDEO_ID: videoId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedVideo) {
                return res.status(404).json({ message: "Video not found" });
            }
            res.status(200).json(updatedVideo);
        } catch (error) {
            res.status(500).json({ message: "Error updating video", error });
        }
    }

    async deleteVideo(req: Request, res: Response) {
        try {
            const { videoId } = req.params;
            const deletedVideo = await Video.findOne({ VIDEO_ID: videoId, STATUS: 1 });
            if (!deletedVideo) {
                return res.status(404).json({ message: "Video not found" });
            }
            deletedVideo.STATUS = false;
            await deletedVideo.save();
            res.status(200).json(deletedVideo);
        } catch (error) {
            res.status(500).json({ message: "Error deleting video", error });
        }
    }
}

export default VideoController;