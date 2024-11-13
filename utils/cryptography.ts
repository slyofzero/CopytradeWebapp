import crypto from "crypto";
import { ENCRYPTION_KEY } from "./env";

export function encrypt(item: string) {
  const cipher = crypto.createCipher("aes-256-ctr", ENCRYPTION_KEY);
  const encryptedPrivateKey = Buffer.concat([
    cipher.update(item, "utf8"),
    cipher.final(),
  ]).toString("hex");

  return encryptedPrivateKey;
}

export function decrypt(encryptedItem: string) {
  const decipher = crypto.createDecipher("aes-256-ctr", ENCRYPTION_KEY);
  const decryptedPrivateKey = Buffer.concat([
    decipher.update(Buffer.from(encryptedItem, "hex")),
    decipher.final(),
  ]).toString();

  return decryptedPrivateKey;
}
