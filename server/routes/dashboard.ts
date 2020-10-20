import Router, { Request, Response } from "express";
import pool from "../db";
import authorization from "../middleware/authorization";

const dashboard = Router();

dashboard.get("/", authorization, async (req: Request, res: Response) => {
  try {
    // res.json(req.user);

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default dashboard;
