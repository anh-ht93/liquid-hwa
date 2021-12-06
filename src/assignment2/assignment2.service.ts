import { Injectable, NotFoundException } from '@nestjs/common';
import Web3 from 'web3';
import {
  TransactionReceipt as Web3TransactionReceipt,
  Log,
} from 'web3-core';
import { TransactionReceipt, Transfer } from './assignment2.interface';
import InfuraConfigService from './infuraConfig.service';

@Injectable()
export class Assignment2Service {
  private web3: Web3;

  constructor(private configService: InfuraConfigService) {
    this.web3 = this.configService.web3;
  }

  async getTransactionByHash(hash: string): Promise<TransactionReceipt> {
    const transaction = await this.web3.eth.getTransactionReceipt(hash);
    if (!transaction) {
      throw new NotFoundException("Transaction with input hash does not exist")
    }
    return this.fromWeb3TransactionReceipt(transaction);
  }

  private fromWeb3TransactionReceipt(
    receipt: Web3TransactionReceipt,
  ): TransactionReceipt {
    const toTransfer = (log: Log): Transfer => ({
      from: log?.topics[1],
      to: log?.topics[2],
      amount: Number(log?.data),
    });

    return {
      blockHeight: receipt?.blockNumber,
      contractAddress: receipt?.to,
      hash: receipt?.transactionHash,
      transfers: receipt?.logs?.map(toTransfer),
    };
  }
}
