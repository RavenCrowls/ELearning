import { Request, Response } from 'express';
import Publishment, { IPublishment } from '../models/Publishment';

class PublishmentController {
    async createPublishment(req: Request, res: Response) {
        try {
            const {
                PUBLISHMENT_ID,
                COURSE_ID,
                USER_ID,
                STATUS
            } = req.body;
            const newPublishment = new Publishment({
                PUBLISHMENT_ID,
                COURSE_ID,
                USER_ID,
                STATUS
            });
            await newPublishment.save();
            res.status(201).json(newPublishment);
        } catch (error) {
            res.status(500).json({ message: "Error creating publishment", error });
        }
    }

    async getAllPublishments(req: Request, res: Response) {
        try {
            const publishmentList = await Publishment.find({ STATUS: 1 });
            res.status(200).json(publishmentList);
        } catch (error) {
            res.status(500).json({ message: "Error getting publishments", error });
        }
    }

    async getPublishment(req: Request, res: Response) {
        try {
            const { publishmentId } = req.params;
            const publishment = await Publishment.findOne({ PUBLISHMENT_ID: publishmentId, STATUS: 1 });
            if (!publishment) {
                return res.status(404).json({ message: "Publishment not found" });
            }
            res.status(200).json(publishment);
        } catch (error) {
            res.status(500).json({ message: "Error getting publishment", error });
        }
    }

    async updatePublishment(req: Request, res: Response) {
        try {
            const { publishmentId } = req.params;
            const {
                COURSE_ID,
                USER_ID
            } = req.body;
            const data = {
                COURSE_ID,
                USER_ID
            };
            const updatedPublishment = await Publishment.findOneAndUpdate(
                { PUBLISHMENT_ID: publishmentId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedPublishment) {
                return res.status(404).json({ message: "Publishment not found" });
            }
            res.status(200).json(updatedPublishment);
        } catch (error) {
            res.status(500).json({ message: "Error updating publishment", error });
        }
    }

    async deletePublishment(req: Request, res: Response) {
        try {
            const { publishmentId } = req.params;
            const deletedPublishment = await Publishment.findOne({ PUBLISHMENT_ID: publishmentId, STATUS: 1 });
            if (!deletedPublishment) {
                return res.status(404).json({ message: "Publishment not found" });
            }
            deletedPublishment.STATUS = false;
            await deletedPublishment.save();
            res.status(200).json(deletedPublishment);
        } catch (error) {
            res.status(500).json({ message: "Error deleting publishment", error });
        }
    }
}

export default PublishmentController;