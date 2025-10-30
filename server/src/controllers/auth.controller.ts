import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const SECRET = process.env.JWT_SECRET || "secretkey";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ message: "Name and password required" });

    const existing = await User.findOne({ where: { name } });
    if (existing)
      return res.status(400).json({ message: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashed });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { name } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, name: user.name }, SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};
