import { Request, Response } from "express";
import taskService from "../services/task.service";

export class TaskController {
  async findALL(req: Request, res: Response) {
    try {
      const role = (req as any).userRole;
      const userId = (req as any).userId;

      let tasks;
      if (role === "admin") {
        tasks = await taskService.findAll();
      } else if (role === "user") {
        tasks = await taskService.findByCreator(userId);
      } else if (role === "member") {
        tasks = await taskService.findByAssignee(userId);
      }

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const task = await taskService.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, userId, assignedTo, description, priority, dueDate } =
        req.body;

      if (!title || !userId)
        return res
          .status(400)
          .json({ message: "Title and userId are required" });

      const task = await taskService.create({
        title,
        userId,
        assignedTo: assignedTo ?? null,
        description,
        priority,
        dueDate,
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error creating task", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const task = await taskService.update(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      if (error instanceof Error && error.message === "Task not found")
        return res.status(404).json({ message: "Task not found" });

      res.status(500).json({ message: "Error updating task", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Task not found")
        return res.status(404).json({ message: "Task not found" });

      res.status(500).json({ message: "Error deleting task", error });
    }
  }
}

export default new TaskController();
