import { Test, TestingModule } from '@nestjs/testing';
import { Assignment2Controller } from './assignment2.controller';

describe('Assignment2Controller', () => {
  let controller: Assignment2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Assignment2Controller],
    }).compile();

    controller = module.get<Assignment2Controller>(Assignment2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
