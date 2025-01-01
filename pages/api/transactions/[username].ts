import { SCRIPT_URL } from "@/utils/env";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, page = "1", size = "10" } = req.query;

  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  if (isNaN(Number(page)) || isNaN(Number(size))) {
    res.status(400).json({ error: "Page and size must be numbers" });
    return;
  }

  try {
    const response = await fetch(
      `${SCRIPT_URL}/profile/${username}?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
}
