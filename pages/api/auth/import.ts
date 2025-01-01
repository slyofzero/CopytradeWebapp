import { addDocument, getDocument, updateDocumentById } from "@/firebase";
import { ApiResponseTemplate } from "@/types/api";
import { StoredUser } from "@/types/user";
import { StoredWallet } from "@/types/wallet";
import { apiPoster } from "@/utils/api";
import { decodeJWT } from "@/utils/auth";
import { encrypt } from "@/utils/cryptography";
import { SCRIPT_URL } from "@/utils/env";
import type { NextApiRequest, NextApiResponse } from "next";

export interface ImportWalletResponse extends ApiResponseTemplate {
  walletAdded?: boolean;
}

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<ImportWalletResponse>
) {
  try {
    const method = req.method;

    switch (method) {
      case "POST": {
        const token = decodeJWT(req);

        if (!token) {
          return res.status(401).json({ message: "Please sign in." });
        }

        const { address, key } = JSON.parse(req.body);

        // Wallet addition
        const userData = (
          await getDocument<StoredUser>({
            collectionName: "users",
            queries: [["mainWallet", "==", token.address]],
          })
        ).at(0);

        if (!userData) {
          return res
            .status(404)
            .json({ message: `User ${token.username} not found` });
        }

        if (userData.wallets.includes(address)) {
          return res.status(201).json({ message: "Wallet is already added" });
        }

        updateDocumentById<StoredUser>({
          id: userData?.id || "",
          collectionName: "users",
          updates: { wallets: [...userData.wallets, address] },
        });

        // Key addition
        const walletData = (
          await getDocument<StoredWallet>({
            collectionName: "wallets",
            queries: [["address", "==", address]],
          })
        ).at(0);

        if (!walletData) {
          addDocument<StoredWallet>({
            collectionName: "wallets",
            data: { address, privateKey: encrypt(key) },
          });
        }

        apiPoster(`${SCRIPT_URL}/newWallet`, {
          username: token.username,
          wallet: address,
        });

        return res.status(200).json({
          message: "New wallet imported",
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
