import { UsernameApiResponse } from "@/pages/api/username";
import { apiFetcher } from "../api";
import { MatchFuncType } from "./types";

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
