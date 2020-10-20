import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface iUser {
  id: string;
}

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. destructure the token
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Not Authorized !");
    }

    const payload = <any>jwt.verify(jwtToken, process.env.jwtSecret as string);

    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized !");
  }
};

export default authorization;
