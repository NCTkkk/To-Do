import { Router } from "express";
import taskRoutes from "./task";
import userRoutes from "./user";
import { authMiddleware } from "../middlewares/auth.middlewares";
import authRoutes from "./auth";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.use("/tasks", authMiddleware, taskRoutes);
router.use("/users", authMiddleware, userRoutes);

router.use("/auth", authRoutes);

export default router;
