import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import {
  HttpProvider,
  TransactionReceipt as Web3TransactionReceipt,
  Log,
} from 'web3-core';
import { TransactionReceipt, Transfer } from './assignment2.interface';

@Injectable()
export class Assignment2Service {
  private web3: Web3;

  constructor(private configService: ConfigService) {
    const provider = this.createHttpProvider(
      this.configService.get('INFURA_PROTOCOL'),
      this.configService.get('INFURA_URL'),
      this.configService.get('INFURA_PROJECT_ID'),
      this.configService.get('INFURA_PROJECT_SECRET'),
    );
    this.web3 = new Web3(provider);
  }

  private createHttpProvider(
    protocol: string,
    host: string,
    projectId: string,
    projectSecret: string,
  ): HttpProvider {
    const url =
      protocol + '://:' + projectSecret + '@' + host + '/' + projectId;
    return new Web3.providers.HttpProvider(url);
  }

  async getTransactionByHash(hash: string): Promise<TransactionReceipt> {
    const transaction = await this.web3.eth.getTransactionReceipt(hash);
    return this.fromWeb3TransactionReceipt(transaction);
  }

  private fromWeb3TransactionReceipt(
    receipt: Web3TransactionReceipt,
  ): TransactionReceipt {
    const toTransfer = (log: Log): Transfer => ({
      from: log.topics[1],
      to: log.topics[2],
      amount: Number(log.data),
    });

    return {
      blockHeight: receipt.blockNumber,
      contractAddress: receipt.to,
      hash: receipt.transactionHash,
      transfers: receipt.logs.map(toTransfer),
    };
  }
}
