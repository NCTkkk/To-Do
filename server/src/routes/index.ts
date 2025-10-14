import { Router } from "express";
import taskRoutes from "./task";
import userRoutes from "./user";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

export default router;
