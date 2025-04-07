import { Request, Response } from 'express';
import Role, { IRole } from '../models/Role';

class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            const {
                ROLE_ID,
                NAME,
                STATUS
            } = req.body;
            const newRole = new Role({
                ROLE_ID,
                NAME,
                STATUS
            });
            await newRole.save();
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ message: "Error creating role", error });
        }
    }

    async getAllRoles(req: Request, res: Response) {
        try {
            const roleList = await Role.find({ STATUS: 1 });
            res.status(200).json(roleList);
        } catch (error) {
            res.status(500).json({ message: "Error getting roles", error });
        }
    }

    async getRole(req: Request, res: Response) {
        try {
            const { roleId } = req.params;
            const role = await Role.findOne({ ROLE_ID: roleId, STATUS: 1 });
            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: "Error getting role", error });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const { roleId } = req.params;
            const {
                NAME
            } = req.body;
            const data = {
                NAME
            };
            const updatedRole = await Role.findOneAndUpdate(
                { ROLE_ID: roleId, STATUS: 1 },
                data,
                { new: true }
            );
            if (!updatedRole) {
                return res.status(404).json({ message: "Role not found" });
            }
            res.status(200).json(updatedRole);
        } catch (error) {
            res.status(500).json({ message: "Error updating role", error });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const { roleId } = req.params;
            const deletedRole = await Role.findOne({ ROLE_ID: roleId, STATUS: 1 });
            if (!deletedRole) {
                return res.status(404).json({ message: "Role not found" });
            }
            deletedRole.STATUS = false;
            await deletedRole.save();
            res.status(200).json(deletedRole);
        } catch (error) {
            res.status(500).json({ message: "Error deleting role", error });
        }
    }
}

export default RoleController;