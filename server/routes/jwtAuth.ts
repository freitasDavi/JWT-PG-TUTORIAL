import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    // 1. destructure req.body (name, email, password)

    const { name, email, password } = req.body;

    // 2. check if users exists ( if exists then throw an error)

    const user = await pool.query("SELECT * FROM users WHERE USER_EMAIL = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // 3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside our database

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    res.status(201).json(newUser.rows[0]);

    // 5. generating our jwt token
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
