import Task from "../models/task";

export class TaskService {
  async findAll() {
    return await Task.findAll();
  }

  async findById(id: string) {
    return await Task.findByPk(id);
  }

  async create(title: string) {
    return await Task.create({ title });
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
