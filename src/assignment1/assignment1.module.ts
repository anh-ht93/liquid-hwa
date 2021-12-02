import { Module } from '@nestjs/common';
import { SigningModule } from 'src/assignment1/signing/signing.module';
import { VerifyingModule } from 'src/assignment1/verifying/verifying.module';
import { Assignments1Controller } from './assignment1.controller';

@Module({
  controllers: [Assignments1Controller],
  imports: [SigningModule, VerifyingModule],
  exports: [SigningModule, VerifyingModule],
})
export class Assignment1Module {}
