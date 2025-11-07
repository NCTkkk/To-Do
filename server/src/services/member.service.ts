import User from "../models/user";

export class MemberService {
  async getAllMembers() {
    return await User.findAll({
      where: { role: "member" },
      attributes: ["id", "name", "role", "createdAt"],
    });
  }
}

export default new MemberService();
