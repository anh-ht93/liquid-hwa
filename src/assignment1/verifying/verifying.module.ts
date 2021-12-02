import { Module } from '@nestjs/common';
import { VerifyingService } from './verifying.service';

@Module({
  providers: [VerifyingService],
  exports: [VerifyingService],
})
export class VerifyingModule {}
