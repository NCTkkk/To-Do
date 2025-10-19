import Task from "../models/task";

export class TaskService {
  async findAll() {
    return await Task.findAll();
  }

  async findById(id: string) {
    return await Task.findByPk(id);
  }

  async create(data: {
    title: string;
    userId: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "done";
    dueDate: Date;
  }) {
    return await Task.create(data);
  }

  async update(id: string, data: { title?: string; completed?: boolean }) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return await task.update(data);
  }

  async delete(id: string) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("Task not found");
    }
    await task.destroy();
    return true;
  }
}

export default new TaskService();
