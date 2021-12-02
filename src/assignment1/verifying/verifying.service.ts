import { Injectable } from '@nestjs/common';
import { ecdsaVerify, signatureImport } from 'secp256k1';
import { VerifyingDTO } from './verifying.interface';

@Injectable()
export class VerifyingService {
  verify(dto: VerifyingDTO): boolean {
    const signature = signatureImport(dto.signature);
    return ecdsaVerify(signature, dto.message, dto.publicKey);
  }
}
