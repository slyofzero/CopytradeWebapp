import { Timestamp } from "firebase-admin/firestore";

export interface StoredUser {
  id?: string;
  username: string;
  mainWallet: string;
  wallets: string[];
  joinedOn: Timestamp;
}
