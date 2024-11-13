import { atom, useAtom } from "jotai";

const defaultUserData = {};
const userAtom = atom(defaultUserData);

export function useUser() {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser };
}
