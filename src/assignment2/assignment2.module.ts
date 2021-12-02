import { Module } from '@nestjs/common';
import { Assignment2Controller } from './assignment2.controller';
import { Assignment2Service } from './assignment2.service';

@Module({
  controllers: [Assignment2Controller],
  providers: [Assignment2Service],
  exports: [Assignment2Service],
})
export class Assignment2Module {}
