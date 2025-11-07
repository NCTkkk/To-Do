import { Request, Response } from "express";
import MemberService from "../services/member.service";

export class MemberController {
  async getAllMembers(req: Request, res: Response) {
    try {
      const members = await MemberService.getAllMembers();
      res.json(members);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách member:", error);
      res.status(500).json({ message: "Lỗi server khi lấy danh sách member" });
    }
  }
}

export default new MemberController();
