import { Request, Response, NextFunction } from "express";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    next();
  };
};
