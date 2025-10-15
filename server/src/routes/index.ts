import { Router } from "express";
import taskRoutes from "./task";
import userRoutes from "./user";
import memberRoutes from "./member";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/members", memberRoutes);

export default router;
