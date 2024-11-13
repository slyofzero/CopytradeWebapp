import { Dispatch, SetStateAction, useState } from "react";
import { veritificationEthAmount } from "@/utils/constants";
import { shortenEthAddress } from "@/utils/web3";
import { clientFetcher } from "@/utils/api";
import { sleep } from "@/utils/time";
import { Copy } from "../Copy";
import { VerifyPOPResponse } from "@/pages/api/auth/pop";
import { KeyedMutator } from "swr";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  address: string;
  mutate: KeyedMutator<any>;
}

type VerificationState = "verifying" | "failed" | "verified" | "pending";

export function VerifyPopModal({ setShowModal, address, mutate }: Props) {
  const [verificationState, setVerificationState] =
    useState<VerificationState>("pending");
  const paymentWallet = process.env.NEXT_PUBLIC_VERIFICATION_ADDRESS;

  const verifyPop = async () => {
    if (verificationState === "pending" || verificationState === "failed") {
      setVerificationState("verifying");

      let attempt = 0;

      for (const attempt_number of Array.from(Array(20).keys())) {
        attempt = attempt_number + 1;
        const data = await clientFetcher<VerifyPOPResponse>(
          `/api/auth/pop?address=${address}`
        );

        if (data.response < 300) {
          console.log("here");
          mutate();
          break;
        }
        await sleep(5000);
      }

      if (attempt < 20) {
        setVerificationState("verified");
        await sleep(5000);
        setShowModal(false);
      } else setVerificationState("failed");
    }
  };

  return (
    <>
      <h6>
        To add a new wallet to your user account, please transfer{" "}
        {veritificationEthAmount}ETH to the below address, from the wallet
        address you just entered.
      </h6>

      <span className="flex gap-1 whitespace-nowrap items-center mx-auto">
        Your Wallet - {shortenEthAddress(address, 10)}
      </span>

      <span className="flex gap-1 items-center w-full">
        <Copy value={paymentWallet} />
        <h6 className="hidden md:block p-2 bg-gray-800 rounded-md flex-grow">
          {paymentWallet}
        </h6>

        <h6 className="md:hidden p-2 bg-gray-800 rounded-md">
          {shortenEthAddress(paymentWallet, 14)}
        </h6>
      </span>

      <button
        onClick={verifyPop}
        className="text-black bg-white rounded-md font-semibold px-4 text-sm p-2 capitalize"
      >
        {verificationState === "pending"
          ? "Verify Now"
          : verificationState === "verifying"
          ? `${verificationState}...`
          : verificationState === "verified"
          ? "Verified Successfully"
          : verificationState}
      </button>
    </>
  );
}
