import { Request, Response } from "express";
import UserService from "../services/user.service";

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
      const user = await UserService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(400).json({ message: "Name and email are required" });
      }
      const user = await UserService.create({ name, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const user = await UserService.update(req.params.id, { name, password });
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
