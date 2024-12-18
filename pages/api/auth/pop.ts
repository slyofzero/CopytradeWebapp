import { getDocument, updateDocumentById } from "@/firebase";
import { etherScanProvider } from "@/rpc";
import { ApiResponseTemplate } from "@/types/api";
import { TransactionHistory } from "@/types/transactionHistory";
import { StoredUser } from "@/types/user";
import { apiFetcher } from "@/utils/api";
import { decodeJWT } from "@/utils/auth";
import {
  validVerificationTime,
  veritificationEthAmount,
} from "@/utils/constants";
import { getSecondsElapsed } from "@/utils/time";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

export interface VerifyPOPResponse extends ApiResponseTemplate {
  walletAdded?: boolean;
}

export default async function verifySignin(
  req: NextApiRequest,
  res: NextApiResponse<VerifyPOPResponse>
) {
  try {
    const method = req.method;
    const paymentWallet = process.env.NEXT_PUBLIC_VERIFICATION_ADDRESS;

    switch (method) {
      case "GET": {
        const token = decodeJWT(req);

        if (!token) {
          return res.status(401).json({ message: "Please sign in." });
        }

        const address = req.query.address as string;

        const txnUrl = etherScanProvider.getUrl("account", {
          action: "txlist",
          address: String(paymentWallet),
          startblock: "0",
          endblock: "99999999",
          page: "1",
          offset: "10",
          sort: "desc",
          apikey: process.env.ETHERSCAN_API_KEY,
        });

        const { data } = await apiFetcher<TransactionHistory>(txnUrl);
        const txnList = data.result;

        // Verifying if a txn has happened in the past 5 minutes.
        for (const txn of txnList) {
          const { to, from, value, timeStamp } = txn;

          if (to !== paymentWallet.toLowerCase()) continue;
          else if (from !== address.toLowerCase()) continue;

          if (getSecondsElapsed(timeStamp) > validVerificationTime) continue;

          const etherValue = parseFloat(
            parseFloat(ethers.formatEther(value)).toFixed(4)
          );

          console.log(etherValue);

          if (etherValue !== veritificationEthAmount) continue;

          const [userData] = await getDocument<StoredUser>({
            collectionName: "users",
            queries: [["username", "==", token.username]],
          });

          if (!userData) {
            return res
              .status(404)
              .json({ message: `User ${token.username} not found` });
          }

          if (userData.wallets.includes(address)) {
            return res.status(201).json({ message: "Wallet is already added" });
          }

          updateDocumentById<StoredUser>({
            collectionName: "users",
            id: userData.id || "",
            updates: { wallets: [...userData.wallets, address] },
          });

          return res
            .status(200)
            .json({ message: "Wallet verified", walletAdded: true });
        }

        return res
          .status(400)
          .json({ message: "Verification transaction not found" });
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
      .json({ message: "There was an error in wallet registration." });
  }
}
