import { getDocument } from "@/firebase";
import { ApiResponseTemplate } from "@/types/api";
import { StoredUser } from "@/types/user";
import type { NextApiRequest, NextApiResponse } from "next";

export interface UserApiResponse extends ApiResponseTemplate {
  user?: StoredUser;
}

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<UserApiResponse>
) {
  try {
    const method = req.method;
    const { username } = req.query;

    switch (method) {
      case "POST": {
        const { address } = req.body;

        if (address) {
          const user = (
            await getDocument<StoredUser>({
              collectionName: "users",
              queries: [["mainWallet", "==", address]],
            })
          ).at(0);

          return res.status(200).json({
            message: `Fetched user ${user?.id}`,
            user,
          });
        }

        return res.status(400).json({
          message: `Please enter the address field`,
        });
      }

      case "GET": {
        if (username) {
          const user = (
            await getDocument<StoredUser>({
              collectionName: "users",
              queries: [["username", "==", username]],
            })
          ).at(0);

          return res.status(200).json({
            message: `Fetched user ${user?.id}`,
            user,
          });
        }

        return res.status(400).json({
          message: `Please enter the username`,
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
