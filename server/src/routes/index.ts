import { Router } from "express";
import taskRoutes from "./task";
import userRoutes from "./user";
import memberRoutes from "./member";
import adminRoutes from "./admin";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/members", memberRoutes);
router.use("/admins", adminRoutes);

export default router;
