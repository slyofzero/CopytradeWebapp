import { Modal } from ".";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Input } from "../Common/Input";
import { isValidUsername } from "@/utils";
import { useAccount } from "wagmi";
import { shortenEthAddress } from "@/utils/web3";
import { apiPoster } from "@/utils/api";
import { RegisterApiResponse } from "@/pages/api/auth/register";
import { useRouter } from "next/router";
import { JWTKeyName } from "@/utils/constants";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function RegisterUsernameModal({ setShowModal }: Props) {
  const { address } = useAccount();
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("address", address as string);
    const fieldData = Object.fromEntries(formData.entries());

    const userRegistered = await apiPoster<RegisterApiResponse>(
      "/api/auth/register",
      fieldData
    );
    const token = userRegistered.data.token;

    if (token) {
      localStorage.setItem(JWTKeyName, token);
      router.push("/dashboard");
      setShowModal(false);
    }
  }

  return (
    <Modal
      className="p-4 flex flex-col gap-8 text-base text-center justify-center"
      setShowModal={setShowModal}
      showCloseBtn={false}
    >
      <div className="flex-grow flex flex-col gap-8 items-center justify-center text-lg">
        <h6>Please enter a username for your account</h6>

        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col md:flex-row gap-4 items-center justify-center mt-2 px-8"
        >
          <Input
            name="username"
            containerClassName="flex-grow"
            match={[isValidUsername]}
          />

          <button
            type="submit"
            className="text-black bg-white rounded-md font-semibold px-4 text-sm p-2 whitespace-nowrap"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-left">
          The username should be between 3-20 characters, and only consist of
          alphabets, numbers, and underscore.
          <br />
          <br />
          Your account will be created with{" "}
          {shortenEthAddress(address as string, 6)} as your main wallet address.
          You&apos;d need to connect the app with this wallet only to sign into
          your account.
        </p>
      </div>
    </Modal>
  );
}
