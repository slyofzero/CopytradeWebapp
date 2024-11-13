// import { web3 } from "@/rpc";
// import { erc20Abi } from "./constants";
// import { ethers } from "ethers";

import { Wallet } from "ethers";

export function isValidEthAddress(address: string) {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
}

export function shortenEthAddress(address: string, show: number = 3) {
  return `${address.slice(0, show)}...${address.slice(
    address.length - show,
    address.length
  )}`;
}

export function importWallet(key: string) {
  try {
    const wallet = new Wallet(key);
    return wallet.address;
  } catch {
    return false;
  }
}

// export async function getTokenBalance(
//   address: string,
//   token: string
// ): Promise<number> {
//   try {
//     const contract = new web3.eth.Contract(erc20Abi, token);
//     const balance = (await contract.methods
//       .balanceOf(address)
//       .call()) as bigint;

//     const decimals = (await contract.methods.decimals().call()) as bigint;
//     const tokenBalance = balance / 10n ** decimals;

//     return Number(tokenBalance);
//   } catch (error) {
//     return 0;
//   }
// }

// export async function getEthBalance(address: string): Promise<number> {
//   try {
//     const weiBalance = await web3.eth.getBalance(address);
//     const ethBalance = roundToSixDecimals(ethers.formatEther(weiBalance));
//     return ethBalance;
//   } catch (error) {
//     return 0;
//   }
// }

// export function roundToSixDecimals(num: string | number | BigInt) {
//   return Number(parseFloat(Number(num).toFixed(6)));
// }

// function decodeHexToDecimal(hex: string) {
//   return BigInt(`0x${hex}`).toString();
// }

// export async function getEthRecieved(hash: string) {
//   const swapEvent =
//     "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822";
//   const txn = await web3.eth.getTransactionReceipt(hash);
//   const swapEventLog = txn.logs.find(({ topics }) =>
//     topics?.includes(swapEvent)
//   );

//   const segmentLength = 64; // Each segment is 32 bytes or 64 hex characters
//   const numberOfSegments = (swapEventLog?.data?.length || 0) / segmentLength; // Calculate how many segments there are
//   const decodedValues = [];

//   for (let i = 0; i < numberOfSegments; i++) {
//     const start = i * segmentLength;
//     const end = start + segmentLength;
//     const segment = swapEventLog?.data?.slice(start, end);
//     if (segment) decodedValues.push(decodeHexToDecimal(segment));
//   }

//   const amount1OutHex = swapEventLog?.data?.slice(192, 300) || "0";
//   const ethRecieved = roundToSixDecimals(
//     web3.utils.fromWei(`0x${amount1OutHex}`, "ether")
//   );
//   return ethRecieved;
// }
