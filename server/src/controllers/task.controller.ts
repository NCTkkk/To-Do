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
      const role = (req as any).userRole;
      const userId = (req as any).userId;
      const task = await taskService.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });

      // check quyền xem
      if (
        role !== "admin" &&
        task.userId !== userId &&
        task.assignedTo !== userId
      ) {
        return res.status(403).json({ message: "Không có quyền xem task này" });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Error fetching task", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).userId; // 🔹 lấy từ token, không tin client
      const { title, assignedTo, description, priority, dueDate } = req.body;

      if (!title) return res.status(400).json({ message: "Title is required" });

      const task = await taskService.create({
        title,
        userId, // người tạo task
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
      const role = (req as any).userRole;
      const userId = (req as any).userId;
      const task = await taskService.findById(req.params.id);

      if (!task) return res.status(404).json({ message: "Task not found" });

      // 🔸 chỉ admin hoặc chính chủ mới sửa
      if (role !== "admin" && task.userId !== userId) {
        return res.status(403).json({ message: "Không có quyền sửa task này" });
      }

      const updated = await taskService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.message === "Task not found")
        return res.status(404).json({ message: "Task not found" });

      res.status(500).json({ message: "Error updating task", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const role = (req as any).userRole;
      const userId = (req as any).userId;
      const task = await taskService.findById(req.params.id);

      if (!task) return res.status(404).json({ message: "Task not found" });

      // 🔸 chỉ admin hoặc chính chủ mới xóa
      if (role !== "admin" && task.userId !== userId) {
        return res.status(403).json({ message: "Không có quyền xóa task này" });
      }

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
