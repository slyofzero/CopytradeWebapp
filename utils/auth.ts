import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

interface TokenData {
  address: string;
  username: string;
}

export function createToken(data: TokenData) {
  const token = jwt.sign(data, process.env.ENCRYPTION_KEY || "", {
    expiresIn: "30d",
  });

  return token;
}

export function decodeJWT(req: NextApiRequest): TokenData | null {
  try {
    const { authorization } = req.headers;
    const decoded = jwt.verify(
      String(authorization),
      process.env.ENCRYPTION_KEY || ""
    ) as TokenData;

    return decoded;
  } catch (err) {
    return null;
  }
}
