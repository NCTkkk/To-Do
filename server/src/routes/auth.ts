import { Router } from "express";
import models from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const router = Router();
const SECRETKEY = process.env.JWT_SECRET || "fallback_secret";

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !password || !role) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }

    const exist = await User.findOne({ where: { name } });
    if (exist) return res.status(400).json({ message: "User đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, password: hashed, role });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: { id: user.id, name: user.name, role: user.role },
    });
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
