import { Injectable } from '@nestjs/common';
import { publicKeyCreate, ecdsaSign, signatureExport } from 'secp256k1';
import { bytesToHexString } from 'src/utils/converters';
import { SigningDTO } from './signing.interface';

@Injectable()
export class SigningService {
  private _signature: Uint8Array;
  private _publicKey: Uint8Array;

  get signature(): string {
    return this._signature && bytesToHexString(this._signature);
  }

  get publicKey(): string {
    return this._publicKey && bytesToHexString(this._publicKey);
  }

  createPublicKey(privateKey: Uint8Array): SigningService {
    this._publicKey = publicKeyCreate(privateKey, false);
    return this;
  }

  sign(signing: SigningDTO): SigningService {
    const { signature } = ecdsaSign(signing.message, signing.privateKey);
    this._signature = signatureExport(signature);
    return this;
  }
}
