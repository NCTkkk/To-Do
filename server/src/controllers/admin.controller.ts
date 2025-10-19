import AdminService from "../services/admin.service";
import { Request, Response } from "express";

export class AdminController {
  async findALL(req: Request, res: Response) {
    try {
      const admins = await AdminService.findAll();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admins", error });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const admin = await AdminService.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error fetching admin", error });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const newAdmin = await AdminService.create(name, email, password);
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ message: "Error creating admin", error });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const updatedAdmin = await AdminService.update(req.params.id, {
        name,
        email,
        password,
      });
      res.status(200).json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ message: "Error updating admin", error });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      await AdminService.delete(req.params.id);
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting admin", error });
    }
  }
}

const adminController = new AdminController();
export default adminController;
