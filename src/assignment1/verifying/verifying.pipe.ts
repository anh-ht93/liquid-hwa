import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { hexToBytes, utf8ToSha3 } from 'src/utils/converters';
import { VerifyingDTO, VerifyingRequest } from './verifying.interface';
import { isHex } from 'web3-utils';

class VerifyingRequestMapperPipe
  implements PipeTransform<VerifyingRequest, VerifyingDTO>
{
  transform(value: VerifyingRequest, metadata: ArgumentMetadata): VerifyingDTO {
    this.validate(value);
    return {
      message: utf8ToSha3(value.message),
      publicKey: hexToBytes(value.publicKey),
      signature: hexToBytes(value.signature),
    };
  }

  private validate(input: any) {
    const valid =
      this.validateInputObj(input) &&
      isHex(input.publicKey) &&
      isHex(input.signature);

    if (!valid) {
      const message = `Invalid input type or private key. Type signature: { message: string, publicKey: string(hex), signature: string(hex) }`;
      throw new BadRequestException(message);
    }
  }

  private validateInputObj(input: any): input is VerifyingRequest {
    return 'message' in input && 'publicKey' in input && 'signature' in input;
  }
}

export { VerifyingRequestMapperPipe };
