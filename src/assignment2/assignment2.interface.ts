interface TransactionReceipt {
  transfers: Array<Transfer>;
  hash: string;
  blockHeight: number;
  contractAddress: string;
}

interface Transfer {
  from: string;
  to: string;
  amount: number;
}

export { TransactionReceipt, Transfer };
