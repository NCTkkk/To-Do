import Task from "../models/task";
import User from "../models/user";

export class TaskService {
  async findAll() {
    return await Task.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "role"] },
        { model: User, as: "assignee", attributes: ["id", "name", "role"] },
      ],
    });
  }

  async findById(id: string) {
    return await Task.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "role"] },
        { model: User, as: "assignee", attributes: ["id", "name", "role"] },
      ],
    });
  }

  async create(data: {
    title: string;
    userId: string;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
    status?: "todo" | "in-progress" | "done";
    dueDate?: Date;
    assignedTo?: string | null;
    description?: string;
  }) {
    return await Task.create({
      ...data,
      completed: data.completed ?? false,
      priority: data.priority ?? "medium",
      status: data.status ?? "todo",
      dueDate: data.dueDate ?? new Date(),
    });
  }

  async update(
    id: string,
    data: Partial<{
      title: string;
      completed: boolean;
      priority: "low" | "medium" | "high";
      status: "todo" | "in-progress" | "done";
      assignedTo: string | null;
      description: string;
    }>
  ) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task not found");

    return await task.update(data);
  }

  async delete(id: string) {
    const task = await Task.findByPk(id);
    if (!task) throw new Error("Task not found");

    await task.destroy();
    return true;
  }

  async findByCreator(userId: string) {
    return await Task.findAll({
      where: { userId },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "role"] },
        { model: User, as: "assignee", attributes: ["id", "name", "role"] },
      ],
    });
  }

  async findByAssignee(userId: string) {
    return await Task.findAll({
      where: { assignedTo: userId },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "role"] },
        { model: User, as: "assignee", attributes: ["id", "name", "role"] },
      ],
    });
  }
}

export default new TaskService();
