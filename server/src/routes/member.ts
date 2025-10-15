import { Router } from "express";
import memberController from "../controllers/member.controller";

const router = Router();
router.get("/", memberController.findALL.bind(memberController));
router.get("/:id", memberController.findById.bind(memberController));
router.post("/", memberController.create.bind(memberController));
router.put("/:id", memberController.update.bind(memberController));
router.delete("/:id", memberController.delete.bind(memberController));

export default router;
