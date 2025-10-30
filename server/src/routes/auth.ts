import { Router } from "express";
import models from "../models";
import jwt from "jsonwebtoken";

const router = Router();
const SECRETKEY = process.env.JWT_SECRET || "fallback_secret";

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { name, password, role } = req.body;

    const exist = await models.User.findOne({ where: { name } });
    if (exist) return res.status(400).json({ message: "User đã tồn tại" });

    const user = await models.User.create({ name, password, role });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await models.User.findOne({ where: { name } });
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    if (user.password !== password)
      return res.status(401).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      SECRETKEY,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
