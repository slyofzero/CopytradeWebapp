import { getDocument } from "@/firebase";
import { ApiResponseTemplate } from "@/types/api";
import { StoredUser } from "@/types/user";
import { decodeJWT } from "@/utils/auth";
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

    switch (method) {
      case "POST": {
        const { address } = JSON.parse(req.body);

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
        const token = decodeJWT(req);

        if (!token) {
          return res.status(401).json({ message: "Please sign in." });
        }

        if (token.username) {
          const user = (
            await getDocument<StoredUser>({
              collectionName: "users",
              queries: [["username", "==", token.username]],
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
