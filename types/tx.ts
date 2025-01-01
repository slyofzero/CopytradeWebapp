export interface SwapTxnData {
  address: string;
  txHash: string;
  tokenIn: any;
  tokenOut: any;
  amountIn: string;
  amountOut: string;
  action: "buy" | "sell" | "swap";
  timestamp: number;
  tokenInAddress: string;
  tokenOutAddress: string;
}
