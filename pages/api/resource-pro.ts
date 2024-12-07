import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  if (typeof JWT_SECRET === "undefined") {
    throw new Error("No JWT SECRET");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decoded.isPro) {
      res
        .status(200)
        .json({ message: "Access granted for Pro User", userId: decoded });
    } else {
      res.status(403).json({ error: "You are not Pro" });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid token", err });
  }
}
