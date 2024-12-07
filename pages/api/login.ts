import { getDatabaseFromEnv } from "@/backend/misc/db";
import { users, tokens } from "@/backend/tables";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (typeof JWT_SECRET === "undefined") {
    throw new Error("No JWT SECRET");
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const { db: database } = await getDatabaseFromEnv();

  const [user] = await database
    .select()
    .from(users)
    .where(eq(users.username, username));
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const accessToken = jwt.sign(
    { userId: user.id, username, isPro: user.is_pro },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.id, username, isPro: user.is_pro },
    JWT_SECRET,
    {
      expiresIn: "60 days",
    }
  );

  await database.insert(tokens).values({
    userId: user.id,
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  });

  res.status(200).json({ accessToken, refreshToken, isPro: user.is_pro });
}
