import { Router } from 'express';
import RoleController from '../controllers/roleController';

const router = Router();
const roleController = new RoleController();

const {
    createRole,
    getAllRoles,
    getRole,
    deleteRole,
    updateRole
} = roleController;

router.post("/", createRole.bind(roleController));
router.get("/", getAllRoles.bind(roleController));
router.get("/:roleId", getRole.bind(roleController));
router.delete("/:roleId", deleteRole.bind(roleController));
router.put("/:roleId", updateRole.bind(roleController));

export { router as roleRouter };