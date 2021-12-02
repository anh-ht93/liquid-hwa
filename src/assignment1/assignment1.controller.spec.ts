import { Test, TestingModule } from '@nestjs/testing';
import { Assignments1Controller } from './assignment1.controller';
import {
  KeyMapperPipe,
  SigningRequestMapperPipe,
} from './signing/signing.pipe';
import { SigningService } from './signing/signing.service';
import { VerifyingRequestMapperPipe } from './verifying/verifying.pipe';
import { VerifyingService } from './verifying/verifying.service';

describe('Assignment1Controller', () => {
  let controller: Assignments1Controller;
  let signingService: SigningService;
  let verifyService: VerifyingService;

  const signingPipe = new SigningRequestMapperPipe();
  const keyPipe = new KeyMapperPipe();
  const verifyPipe = new VerifyingRequestMapperPipe();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Assignments1Controller],
      providers: [SigningService, VerifyingService],
    }).compile();

    controller = module.get<Assignments1Controller>(Assignments1Controller);
    signingService = await module.resolve(SigningService);
    verifyService = await module.resolve(VerifyingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create correct signature with valid input', async () => {
    const message = 'hello-world';
    const privateKey =
      'b12dbc163d7935fba5ba11aba0691a11b2f6a2235c1ffa51718955e2e1da6249';
    const signingRequest = signingPipe.transform({ message, privateKey }, null);

    const expectedPublicKey =
      '304402200a0d96e12d5f20282d2505cec1919ce243177ce1ff6a99920c6e6d33ce0756d402207bbfee6c1c41971c53c68afeaec688b9f442cc1688cdbd088ce8aea0897fc795';
    const publicKey = await controller.sign(signingRequest);

    expect(publicKey.signature).toBe(expectedPublicKey);
  });
});
