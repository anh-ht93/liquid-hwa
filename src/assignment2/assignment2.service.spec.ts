import { Test, TestingModule } from '@nestjs/testing';
import { Assignment2Service } from './assignment2.service';

describe('Assignment2Service', () => {
  let service: Assignment2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Assignment2Service],
    }).compile();

    service = module.get<Assignment2Service>(Assignment2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
