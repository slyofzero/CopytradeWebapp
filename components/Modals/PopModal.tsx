import { ShowWhen } from "../Utils";
import { Modal } from ".";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { VerifyPopModal } from "./VerifyPopModal";
import { Input } from "../Common/Input";
import { veritificationEthAmount } from "@/utils/constants";
import { isValidEthAddress } from "@/utils";
import { KeyedMutator } from "swr";

interface SignInFormData {
  address: string;
}

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<any>;
}

export function PopModal({ setShowModal, mutate }: Props) {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [address, setAddress] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const { address } = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as SignInFormData;

    setAddress(address);

    setShowVerificationModal(true);
  }

  const signInModal = (
    <div className="flex-grow flex flex-col gap-2 items-center justify-center text-lg">
      <h6>Please enter your wallet address</h6>

      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row gap-4 items-center mt-2"
      >
        <Input
          name="address"
          className="w-[21rem] md:w-[23rem]"
          required
          match={[isValidEthAddress]}
        />

        <button className="text-black bg-white rounded-md font-semibold px-4 text-sm p-2 whitespace-nowrap">
          Verify
        </button>
      </form>

      <h6 className="mt-8">
        To add your wallet, simply enter the wallet address you wish the add and
        then click verify. A Wallet address will appear on the next page where
        you are to send {veritificationEthAmount}ETH to verify your the owner of
        the same wallet (P.O.W.O) Method
      </h6>
    </div>
  );

  return (
    <Modal
      className="p-4 flex flex-col gap-8 text-base text-center justify-center"
      setShowModal={setShowModal}
    >
      <ShowWhen
        component={
          <VerifyPopModal
            mutate={mutate}
            setShowModal={setShowModal}
            address={address}
          />
        }
        when={showVerificationModal}
        otherwise={signInModal}
      />
    </Modal>
  );
}
