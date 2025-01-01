import { useApi } from "@/hooks";
import { ProfileTxnsResponse } from "@/pages/api/transactions/[username]";
import { classNames } from "@/utils";
import { shortenEthAddress } from "@/utils/web3";
import React, { useState } from "react";
import { Link } from "./Common";
import { FaExternalLinkAlt } from "react-icons/fa";
import { WETH } from "@/utils/constants";

interface Props {
  username: string;
}

function EtherscanLink({
  text,
  address,
  type,
}: {
  text: string;
  address: string;
  type?: "tx" | "address" | "token";
}) {
  type ||= "address";
  if (address.toLowerCase() === WETH) {
    return <span>{text}</span>;
  }
  let link = `https://etherscan.io/${type}/${address}`;
  if (type === "token") {
    link = `https://dexscreener.com/ethereum/${address}`;
  }

  return (
    <Link
      className="underline flex gap-2 items-center"
      target="_blank"
      href={link}
    >
      {text}
      <FaExternalLinkAlt className="text-xs" />
    </Link>
  );
}

export function Transactions({ username }: Props) {
  const [page, setPage] = useState<number>(1);
  const { data } = useApi<ProfileTxnsResponse>(
    `/api/transactions/${username}?page=${page}`
  );
  const totalPages = data?.totalPages || 0;
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col gap-8 mb-16">
      <div className="overflow-x-auto">
        <div className="min-w-max mt-16">
          <div className="grid grid-cols-5 gap-4 capitalize">
            <div className="font-bold text-center">txn</div>
            <div className="font-bold text-center">Type</div>
            <div className="font-bold text-center">Token</div>
            <div className="font-bold text-center">For</div>
            <div className="font-bold text-center">Address</div>
          </div>

          {data?.transactions.map((txn, key) => {
            const amountIn = new Intl.NumberFormat("en-US").format(
              parseFloat(parseFloat(txn.amountIn).toFixed(6))
            );
            const amountOut = new Intl.NumberFormat("en-US").format(
              parseFloat(parseFloat(txn.amountOut).toFixed(6))
            );
            return (
              <div
                key={key}
                className="grid grid-cols-5 gap-4 border border-white my-4 py-4 rounded-lg"
              >
                <div className="flex items-center justify-center gap-2 underline">
                  <EtherscanLink
                    text={shortenEthAddress(txn.txHash)}
                    address={txn.txHash}
                    type="tx"
                  />
                </div>
                <div
                  className={classNames(
                    "capitalize text-center",
                    txn.action === "buy"
                      ? "text-green-500"
                      : txn.action === "sell"
                      ? "text-red-500"
                      : "text-blue-500"
                  )}
                >
                  {txn.action}
                </div>
                <div className="flex gap-2 justify-end">
                  {txn.action === "buy" ? (
                    <>
                      <span>{amountOut}</span>
                      <EtherscanLink
                        text={txn.tokenOut}
                        address={txn.tokenOutAddress}
                        type="token"
                      />
                    </>
                  ) : (
                    <>
                      <span>{amountIn}</span>
                      <EtherscanLink
                        text={txn.tokenIn}
                        address={txn.tokenInAddress}
                        type="token"
                      />
                    </>
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  {txn.action === "buy" ? (
                    <>
                      <span>{amountIn}</span>
                      <EtherscanLink
                        text={txn.tokenIn}
                        address={txn.tokenInAddress}
                        type="token"
                      />
                    </>
                  ) : (
                    <>
                      <span>{amountOut}</span>
                      <EtherscanLink
                        text={txn.tokenOut}
                        address={txn.tokenOutAddress}
                        type="token"
                      />
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 underline">
                  <EtherscanLink
                    text={shortenEthAddress(txn.address)}
                    address={txn.address}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-8 items-center">
        <button
          onClick={prevPage}
          disabled={page <= 1}
          className="px-4 py-2 text-black bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page >= totalPages}
          className="px-4 py-2 text-black bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
