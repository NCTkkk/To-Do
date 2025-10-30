// import { Router } from "express";
// import taskController from "../controllers/task.controller";
// import { register, login } from "../controllers/auth.controller";

// const router = Router();

// router.post("/register", register);
// router.post("/login", login);

// router.get("/", taskController.findALL.bind(taskController));
// router.get("/:id", taskController.findById.bind(taskController));
// router.post("/", taskController.create.bind(taskController));
// router.put("/:id", taskController.update.bind(taskController));
// router.delete("/:id", taskController.delete.bind(taskController));

// export default router;

import { Router } from "express";
import taskController from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

// task
router.get(
  "/",
  authMiddleware,
  authorize("admin", "user", "member"),
  taskController.findALL.bind(taskController)
);

router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "user", "member"),
  taskController.findById.bind(taskController)
);

router.post(
  "/",
  authMiddleware,
  authorize("admin", "user"),
  taskController.create.bind(taskController)
);

router.put(
  "/:id",
  authMiddleware,
  authorize("admin", "user", "member"),
  taskController.update.bind(taskController)
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "user"),
  taskController.delete.bind(taskController)
);

export default router;
