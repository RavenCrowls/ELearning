import { Router } from 'express';
import PublishmentController from '../controllers/publishmentController';

const router = Router();
const publishmentController = new PublishmentController();

const {
    createPublishment,
    getAllPublishments,
    getPublishment,
    deletePublishment,
    updatePublishment
} = publishmentController;

router.post("/", createPublishment.bind(publishmentController));
router.get("/", getAllPublishments.bind(publishmentController));
router.get("/:publishmentId", getPublishment.bind(publishmentController));
router.delete("/:publishmentId", deletePublishment.bind(publishmentController));
router.put("/:publishmentId", updatePublishment.bind(publishmentController));

export { router as publishmentRouter };