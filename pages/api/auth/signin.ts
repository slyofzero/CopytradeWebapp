import { getDocument } from "@/firebase";
import { ApiResponseTemplate } from "@/types/api";
import { StoredUser } from "@/types/user";
import { createToken } from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export interface SignInApiResponse extends ApiResponseTemplate {
  token?: string;
}

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse<SignInApiResponse>
) {
  try {
    const method = req.method;

    switch (method) {
      case "POST": {
        const { username, address } = req.body;

        const user = (
          await getDocument<StoredUser>({
            collectionName: "users",
            queries: [["username", "==", username]],
          })
        ).at(0);

        if (!user) {
          return res.status(404).json({
            message: `User with username ${username} not found`,
          });
        }

        const token = createToken({ address, username });

        return res.status(200).json({
          message: `User ${user?.id} with username ${username} signed in`,
          token,
        });
      }

      default: {
        return res.status(405).json({ message: "Method not allowed." });
      }
    }
  } catch (err) {
    const error = err as Error;
    // eslint-disable-next-line
    console.error(error.message, error.stack);

    return res
      .status(500)
      .json({ message: "There was an error in get the user data." });
  }
}
