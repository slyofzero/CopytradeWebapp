import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

export const etherScanProvider = new ethers.EtherscanProvider(
  // process.env.NODE_ENV === "development" ? "sepolia" : "mainnet",
  "mainnet",
  process.env.ETHERSCAN_API_KEY
);

// https://api.etherscan.io/api?module=account&action=tokentx&page=1&offset=20&sort=desc&address=0x164Bc39CeA3d1bdB52D00C72A65C412741A04FBb&apikey=UMW223TKDVPXTX6F319W4M92474NT93UXV
