import { Request, Response } from "express";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";

export class UserController {
  async findALL(req: Request, res: Response) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const role = (req as any).userRole;
      const targetId = req.params.id;

      // user/member chỉ xem được chính mình
      if (role !== "admin" && userId !== targetId) {
        return res.status(403).json({ message: "Không thể xem người khác" });
      }

      const user = await UserService.findById(targetId);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, password, role } = req.body;
      if (!name || !password) {
        return res
          .status(400)
          .json({ message: "Name and password are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserService.create({ name, password, role });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const role = (req as any).userRole;
      const targetId = req.params.id;

      // user/member chỉ được sửa chính mình
      if (role !== "admin" && userId !== targetId) {
        return res
          .status(403)
          .json({ message: "Không thể sửa thông tin người khác" });
      }

      const { name, password } = req.body;
      const user = await UserService.update(targetId, { name, password });
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await UserService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
}

export default new UserController();
