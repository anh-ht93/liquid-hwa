import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Assignments1Controller } from './assignment1/assignment1.controller';
import { Assignment1Module } from './assignment1/assignment1.module';
import { Assignment2Controller } from './assignment2/assignment2.controller';
import { Assignment2Module } from './assignment2/assignment2.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Assignment1Module,
    Assignment2Module,
  ],
  controllers: [Assignments1Controller, Assignment2Controller],
  providers: [AppService],
})
export class AppModule {}
