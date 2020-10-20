import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import jwtGenerator from "../utils/jwtGenerator";
// const jwtGenerator = require("../utils/jwtGenerator");

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

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Login route

router.post("/login", async (req: Request, res: Response) => {
  try {
    // 1. Destructure the req.body

    const { email, password } = req.body;

    // 2. Check if user doesen't exist (if not then we throw an error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User not found");
    }

    // 3. Check if incoming password is the same the database password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password incorrect!");
    }

    // 4. Give them the jwt Token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
