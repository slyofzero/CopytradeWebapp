import { Image, Link } from "../Common";
import { generateProfilePicture } from "@/utils/general";
import { shortenEthAddress } from "@/utils/web3";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useApi } from "@/hooks";
import { UserApiResponse } from "@/pages/api/user";
import { veritificationEthAmount } from "@/utils/constants";
import { useState } from "react";
import { ShowWhen } from "../Utils";
import { PopModal } from "../Modals/PopModal";
import { ImportWalletModal } from "../Modals/ImportWalletModal";
import { useUser } from "@/states";

interface Props {
  username: string;
}

export function Dashboard({ username }: Props) {
  const { data, mutate } = useApi<UserApiResponse>(`/api/user/${username}`);

  const { user } = useUser();

  const isDashboard = user?.username === username;
  const userData = data?.user;
  const image = generateProfilePicture(userData?.mainWallet || "");
  const addresses = userData?.wallets || [];

  const [showImportWalletModal, setShowImportWalletModal] = useState(false);
  const [showPopModal, setShowPopModal] = useState(false);

  return (
    <>
      <div className="flex-grow flex-col gap-8 justify-center items-center">
        <div className="flex gap-8 md:gap-16 justify-center items-center mt-16">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={image}
              alt={`${userData?.username}'s profile pic`}
              className="w-24 aspect-square rounded-full"
            />
            <h3 className="font-semibold">{userData?.username}</h3>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg">Addresses - </h3>
            <div className="flex flex-col gap-2">
              {addresses.map((address, key) => (
                <Link
                  className="flex gap-2 items-center text-sm"
                  href={`https://etherscan.io/address/${address}`}
                  key={key}
                >
                  {shortenEthAddress(address || "", 10)}{" "}
                  <FaExternalLinkAlt className="text-xs" />
                </Link>
              ))}
            </div>
          </div>

          {isDashboard && (
            <div className="hidden md:flex flex-col justify-center items-center font-bold gap-4 text-sm">
              <button
                onClick={() => setShowImportWalletModal(true)}
                className="px-4 py-1 text-black bg-white rounded-md"
              >
                Import with Private Key
              </button>
              <button
                onClick={() => setShowPopModal(true)}
                className="px-4 py-1 text-black bg-white rounded-md"
              >
                Pay {veritificationEthAmount}ETH to connect
              </button>
            </div>
          )}
        </div>

        {isDashboard && (
          <div className="flex md:hidden flex-col justify-center items-center font-bold gap-4 text-sm mt-8">
            <button
              onClick={() => setShowImportWalletModal(true)}
              className="px-4 py-1 text-black bg-white rounded-md"
            >
              Import with Private Key
            </button>
            <button
              onClick={() => setShowPopModal(true)}
              className="px-4 py-1 text-black bg-white rounded-md"
            >
              Pay {veritificationEthAmount}ETH to connect
            </button>
          </div>
        )}
      </div>
      <ShowWhen
        component={
          <ImportWalletModal
            mutate={mutate}
            setShowModal={setShowImportWalletModal}
          />
        }
        when={showImportWalletModal}
      />

      <ShowWhen
        component={<PopModal mutate={mutate} setShowModal={setShowPopModal} />}
        when={showPopModal}
      />
    </>
  );
}
