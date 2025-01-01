import { SwapTxnData } from "@/types/tx";
import { apiFetcher } from "@/utils/api";
import { SCRIPT_URL } from "@/utils/env";
import { NextApiRequest, NextApiResponse } from "next";

export interface ProfileTxnsResponse {
  transactions: SwapTxnData[];
  currentPage: number;
  totalPages: number;
}

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
    const { data } = await apiFetcher<ProfileTxnsResponse>(
      `${SCRIPT_URL}/profile/${username}?page=${page}&size=${size}`
    );
    return res.status(200).json(data);
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
}
