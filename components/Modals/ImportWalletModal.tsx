import { Modal } from ".";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../Common/Input";
import { isValidPrivateKey } from "@/utils";
import { KeyedMutator } from "swr";
import { importWallet, shortenEthAddress } from "@/utils/web3";
import { ShowWhen } from "../Utils";
import { clientPoster } from "@/utils/api";
import { ImportWalletResponse } from "@/pages/api/auth/import";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<any>;
}

export function ImportWalletModal({ setShowModal, mutate }: Props) {
  const [privateKey, setPrivateKey] = useState("");

  const wallet = importWallet(privateKey);

  const addWallet = async () => {
    await clientPoster<ImportWalletResponse>(`/api/auth/import`, {
      address: wallet,
      key: privateKey,
    });

    mutate();
    setShowModal(false);
  };

  return (
    <Modal
      className="p-4 flex flex-col gap-8 text-base text-center justify-center"
      setShowModal={setShowModal}
    >
      <div className="flex-grow flex flex-col gap-2 items-center justify-center text-lg">
        <h6>Please enter your wallet&apos;s private key</h6>

        <Input
          name="privateKey"
          required
          match={[isValidPrivateKey]}
          onChange={(e) => setPrivateKey(e.target.value)}
          containerClassName="w-full"
        />

        <div className="flex flex-col gap-8 mt-8 text-sm">
          <ShowWhen
            component={
              <h6>
                To import your wallet, simply enter its private key above.
              </h6>
            }
            when={!wallet}
            otherwise={
              <>
                <span>
                  The key you entered belongs to{" "}
                  <strong>{shortenEthAddress(wallet || "", 10)}</strong>, should
                  this wallet be added to your account?
                </span>

                <button
                  onClick={addWallet}
                  className="text-black bg-white rounded-md font-semibold px-4 text-sm p-2 capitalize"
                >
                  Add wallet
                </button>
              </>
            }
          />
        </div>
      </div>
    </Modal>
  );
}
