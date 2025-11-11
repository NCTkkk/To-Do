import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/profile",
  authorize("admin", "user", "member"),
  UserController.profile.bind(UserController)
);

router.get(
  "/",
  authorize("admin"),
  UserController.findALL.bind(UserController)
);
router.get(
  "/:id",
  authorize("admin", "user", "member"),
  UserController.findById.bind(UserController)
);
router.post(
  "/",
  authorize("admin"),
  UserController.create.bind(UserController)
);
router.put(
  "/:id",
  authorize("admin", "user", "member"),
  UserController.update.bind(UserController)
);
router.delete(
  "/:id",
  authorize("admin"),
  UserController.delete.bind(UserController)
);

export default router;
