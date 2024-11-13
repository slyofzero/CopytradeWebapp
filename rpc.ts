import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

export const etherScanProvider = new ethers.EtherscanProvider(
  // process.env.NODE_ENV === "development" ? "sepolia" : "mainnet",
  "mainnet",
  process.env.ETHERSCAN_API_KEY
);
