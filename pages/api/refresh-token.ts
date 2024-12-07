import { getDatabaseFromEnv } from "@/backend/misc/db";
import { tokens } from "@/backend/tables";
import jwt, { JwtPayload } from "jsonwebtoken";
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

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const { db: database } = await getDatabaseFromEnv();

  if (!JWT_SECRET) {
    throw new Error("No JWT SECRET");
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;

    const [storedToken] = await database
      .select()
      .from(tokens)
      .where(eq(tokens.refreshToken, refreshToken));

    if (!storedToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        username: decoded.username,
        isPro: decoded.isPro,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const newRefreshToken = jwt.sign(
      {
        userId: decoded.userId,
        username: decoded.username,
        isPro: decoded.isPro,
      },
      JWT_SECRET,
      {
        expiresIn: "60 days",
      }
    );

    await database
      .update(tokens)
      .set({ refreshToken: newRefreshToken })
      .where(eq(tokens.id, storedToken.id));

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token", err });
  }
}
