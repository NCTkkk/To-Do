import Member from "../models/member";

export class MemberService {
  async findAll() {
    return await Member.findAll();
  }

  async findById(id: string) {
    return await Member.findByPk(id);
  }

  async create(username?: string, email?: string, password?: string) {
    return await Member.create({ username, email, password });
  }

  async update(
    id: string,
    data: { username?: string; email?: string; password?: string }
  ) {
    const member = await Member.findByPk(id);
    if (!member) {
      throw new Error("Member not found");
    }
    return await member.update(data);
  }

  async delete(id: string) {
    const member = await Member.findByPk(id);
    if (!member) {
      throw new Error("Member not found");
    }
    await member.destroy();
    return true;
  }
}

export default new MemberService();
