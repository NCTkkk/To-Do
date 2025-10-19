import adminController from "../controllers/admin.controller";
import { Router } from "express";

const router = Router();

router.get("/", adminController.findALL.bind(adminController));
router.get("/:id", adminController.findById.bind(adminController));
router.post("/", adminController.create.bind(adminController));
router.put("/:id", adminController.update.bind(adminController));
router.delete("/:id", adminController.delete.bind(adminController));

export default router;
