import { addDocument, getDocument } from "@/firebase";
import { ApiResponseTemplate } from "@/types/api";
import { StoredUser } from "@/types/user";
import { createToken } from "@/utils/auth";
import { Timestamp } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export interface RegisterApiResponse extends ApiResponseTemplate {
  token?: string;
}

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse<RegisterApiResponse>
) {
  try {
    const method = req.method;

    switch (method) {
      case "POST": {
        const { username, address } = JSON.parse(req.body);

        const user = (
          await getDocument<StoredUser>({
            collectionName: "users",
            queries: [["username", "==", username]],
          })
        ).at(0);

        if (user) {
          return res.status(400).json({
            message: `A user with username "${username}" already exists`,
          });
        }

        const newUser = await addDocument<StoredUser>({
          collectionName: "users",
          data: {
            username,
            mainWallet: address,
            joinedOn: Timestamp.now(),
            wallets: [],
          },
        });

        const token = createToken({ address, username });

        return res.status(200).json({
          message: `Registered user ${newUser?.id} with username ${username}`,
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
