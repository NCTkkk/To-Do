import User from "../models/user";

export class UserService {
  async findById(id: string) {
    return await User.findByPk(id);
  }

  async findAll() {
    return await User.findAll();
  }

  async create(data: { name?: string; password?: string }) {
    return await User.create(data);
  }

  async update(id: string, data: { name?: string; password?: string }) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(data);
  }

  async delete(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  }
}

export default new UserService();
