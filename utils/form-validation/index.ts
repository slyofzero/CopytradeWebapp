import { UsernameApiResponse } from "@/pages/api/username";
import { apiFetcher } from "../api";
import { MatchFuncType } from "./types";
import { Wallet } from "ethers";

export * from "./types";

// ------------------------------ To check if the name is valid ------------------------------
export const isValidName: MatchFuncType = (name) => {
  const namePattern = /^[A-Za-z\s]+$/;
  const isNameValid = namePattern.test(name);

  if (!isNameValid) {
    return "Please enter a valid name.";
  }

  return true;
};

// ------------------------------ To check if the name is valid ------------------------------
export const isValidUsername: MatchFuncType = async (username) => {
  const namePattern = /^[A-Za-z0-9_]{3,20}$/;
  const isNameValid = namePattern.test(username);

  if (!isNameValid) {
    return "Please enter a valid username";
  }

  const usernameExists = await apiFetcher<UsernameApiResponse>(
    `/api/username?username=${username}`
  );
  if (usernameExists.data.userExists) return "Username is already taken";

  return true;
};

// ------------------------------ To check if the address is valid ------------------------------
export const isValidEthAddress: MatchFuncType = (address) => {
  const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/;
  const isAddressValid = ethAddressPattern.test(address);

  if (!isAddressValid) {
    return "Please enter a valid Ethereum address.";
  }

  return true;
};

// ------------------------------ To check if the private key is valid ------------------------------
export function isValidPrivateKey(privateKey: string) {
  // Check if the private key is 64 characters and hexadecimal
  const isHexadecimal = /^[0-9a-fA-F]{64}$/.test(privateKey);

  if (!isHexadecimal) {
    return "Please enter a valid private key.";
  }

  try {
    // Try creating a Wallet instance with the private key
    new Wallet(privateKey);
    return true;
  } catch {
    return "Please enter a valid private key.";
  }
}
