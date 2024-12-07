import { getDatabaseFromEnv } from "@/backend/misc/db";
import { tokens, users } from "@/backend/tables";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password, isPro } = req.body;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { db: database } = await getDatabaseFromEnv();

  try {
    const [newUser] = await database
      .insert(users)
      .values({ username, password: hashedPassword, is_pro: isPro || false })
      .returning({ id: users.id });

    if (!newUser || !newUser.id) {
      throw new Error("Failed to retrieve new user ID");
    }

    const userId = newUser.id;

    const accessToken = jwt.sign({ userId, username, isPro }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, username, isPro }, JWT_SECRET, {
      expiresIn: "60d",
    });

    await database.insert(tokens).values({
      userId,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: "Error registering user", err });
  }
}
