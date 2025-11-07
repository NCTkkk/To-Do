import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { authorize } from "../middlewares/role.middleware";
import MemberController from "../controllers/member.controller";

const router = Router();

// Lấy danh sách member (cho phép admin hoặc user)
router.get(
  "/",
  authMiddleware,
  authorize("admin", "user"),
  MemberController.getAllMembers.bind(MemberController)
);

export default router;
