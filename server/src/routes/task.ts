import { Router } from "express";
import taskController from "../controllers/task.controller";

const router = Router();

router.get("/", taskController.findALL.bind(taskController));
router.get("/:id", taskController.findById.bind(taskController));
router.post("/", taskController.create.bind(taskController));
router.put("/:id", taskController.update.bind(taskController));
router.delete("/:id", taskController.delete.bind(taskController));

export default router;
