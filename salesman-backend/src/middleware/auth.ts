// Either use this if you have the User model in your schema
// import type { User } from "@prisma/client";

// Or define your own type
type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mcsharp";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
   res.status(401).json({ error: "Unauthorized: No token provided" });
   return
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    
    req.user = decoded as User;
    next();
  });
};