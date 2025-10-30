import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

interface JwtPayloadCustom extends jwt.JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
    (req as any).userId = (decoded as any).id;
    (req as any).userRole = decoded.role;
    next();
  } catch (err: any) {
    console.error("❌ Token verify fail:", err.message);
    return res
      .status(401)
      .json({ message: "Token không hợp lệ", error: err.message });
  }
};
