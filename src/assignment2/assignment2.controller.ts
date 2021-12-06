import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { TransactionReceipt } from './assignment2.interface';
import { HashNormalizePipe } from './assignment2.pipe';
import { Assignment2Service } from './assignment2.service';

@Controller('assignment2')
export class Assignment2Controller {
  constructor(private assignment2Service: Assignment2Service) {}

  @Get('transaction/:hash')
  @UsePipes(HashNormalizePipe)
  async getTransaction(@Param('hash') hash: string): Promise<TransactionReceipt> {
    return await this.assignment2Service.getTransactionByHash(hash);
  }
}
