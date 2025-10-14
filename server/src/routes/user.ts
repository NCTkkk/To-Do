import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.findALL.bind(UserController));
router.get("/:id", UserController.findById.bind(UserController));
router.post("/", UserController.create.bind(UserController));
router.put("/:id", UserController.update.bind(UserController));
router.delete("/:id", UserController.delete.bind(UserController));

export default router;
