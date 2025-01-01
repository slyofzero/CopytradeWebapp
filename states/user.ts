import { StoredUser } from "@/types/user";
import { atom, useAtom } from "jotai";

const defaultUserData: StoredUser = {
  // @ts-expect-error asdas
  joinedOn: "",
  mainWallet: "",
  username: "",
  wallets: [],
};
const userAtom = atom(defaultUserData);

export function useUser() {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser };
}
