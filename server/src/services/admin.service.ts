import Admin from "../models/admin";

export class AdminService {
  async findAll() {
    return await Admin.findAll();
  }
  async findById(id: string) {
    return await Admin.findByPk(id);
  }
  async create(name?: string, email?: string, password?: string) {
    return await Admin.create({ name, email, password });
  }
  async update(
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return await admin.update(data);
  }
  async delete(id: string) {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    await admin.destroy();
    return true;
  }
}

export default new AdminService();
