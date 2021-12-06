import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { hexToBytes, utf8ToSha3 } from 'src/utils/converters';
import { SigningDTO, SigningRequest } from './signing.interface';
import { is32ByteHex } from 'src/utils/validators';

class SigningRequestMapperPipe
  implements PipeTransform<SigningRequest, SigningDTO>
{
  transform(value: SigningRequest, metadata: ArgumentMetadata): SigningDTO {
    this.validate(value);
    return {
      message: utf8ToSha3(value.message),
      privateKey: hexToBytes(value.privateKey),
    };
  }

  private validate(input: any) {
    const valid = this.validateInputObj(input) && is32ByteHex(input.privateKey);

    if (!valid) {
      const message = `Invalid input type or private key. Type signature: { message: string, privateKey: string(32-byte hex) }`;
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  private validateInputObj(input: any): input is SigningRequest {
    return 'message' in input && 'privateKey' in input;
  }
}

class KeyMapperPipe implements PipeTransform<string, Uint8Array> {
  transform(value: string, metadata: ArgumentMetadata): Uint8Array {
    if (!is32ByteHex(value)) {
      const message = 'Invalid key. The input should be a valid 32-byte hex string';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    return hexToBytes(value);
  }
}

export { SigningRequestMapperPipe, KeyMapperPipe };
