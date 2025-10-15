import { Response, Request } from "express";
import memberService from "../services/member.service";

export class MemberController {
  async findALL(req: Request, res: Response) {
    try {
      const members = await memberService.findAll();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Error fetching members", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const member = await memberService.findById(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Error fetching member", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Username, email and password are required" });
      }
      const member = await memberService.create(username, email, password);
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ message: "Error creating member", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const member = await memberService.update(req.params.id, {
        username,
        email,
        password,
      });
      res.json(member);
    } catch (error) {
      if (error instanceof Error && error.message === "Member not found") {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(500).json({ message: "Error updating member", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await memberService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Member not found") {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(500).json({ message: "Error deleting member", error });
    }
  }
}

const memberController = new MemberController();
export default memberController;
