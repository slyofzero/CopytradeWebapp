import * as React from "react";
import { ConnectButton as RainbowConnect } from "@rainbow-me/rainbowkit";

export function ConnectButton() {
  return (
    <RainbowConnect
      label="Connect Wallet"
      chainStatus={"icon"}
      accountStatus={"full"}
      showBalance={false}
    />
  );
}
