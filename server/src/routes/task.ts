import { Router } from "express";
import taskController from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { authorize } from "../middlewares/role.middleware";
import Task from "../models/task";

const router = Router();

router.get("/submissions", authMiddleware, async (req: any, res) => {
  try {
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Chỉ user mới được xem bài nộp." });
    }

    // Lấy tất cả task do user này tạo, kèm submission
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      attributes: ["id", "title", "status", "submission", "assignedTo"],
      order: [["updatedAt", "DESC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bài nộp:", err);
    res.status(500).json({ message: "Lỗi khi tải danh sách bài nộp." });
  }
});

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

router.get("/assigned", authMiddleware, async (req: any, res) => {
  try {
    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Chỉ member mới được truy cập." });
    }

    const tasks = await Task.findAll({
      where: { assignedTo: req.user.id },
      order: [["updatedAt", "DESC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tải danh sách task." });
  }
});

// 🧩 Member: nộp bài (cập nhật trạng thái + submission)
router.put("/:id/submit", authMiddleware, async (req: any, res) => {
  console.log("rep.user: ", req.user);
  try {
    if (req.user.role !== "member") {
      return res.status(403).json({ message: "Chỉ member mới được nộp bài." });
    }

    const { id } = req.params;
    const submission = req.body?.submission || "Đã hoàn thành.";

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task không tồn tại." });
    }

    if (task.assignedTo !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền nộp task này." });
    }

    task.status = "done";
    task.submission = submission;
    await task.save();

    res.json({ message: "Nộp bài thành công!", task });
  } catch (err) {
    console.error("❌ Lỗi khi nộp bài:", err);
    res.status(500).json({ message: "Lỗi khi nộp bài." });
  }
});

// 📄 Lấy danh sách bài nộp cho tất cả task của user (role=user)

export default router;
