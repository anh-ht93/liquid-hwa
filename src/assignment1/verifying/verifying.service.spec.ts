import { Test, TestingModule } from '@nestjs/testing';
import { VerifyingService } from './verifying.service';

describe('VerifyingService', () => {
  let service: VerifyingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyingService],
    }).compile();

    service = module.get<VerifyingService>(VerifyingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
