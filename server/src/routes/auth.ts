import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../types/user";

const router = Router();

const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.status(409).json("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json("User registered");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET ?? "");
    res.status(200).json({ message: "Authentication successful", token });
  } else {
    res.status(401).json("Invalid credentials");
  }
});

export default router;
