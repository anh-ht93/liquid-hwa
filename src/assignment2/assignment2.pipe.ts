import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { normalizeHex } from 'src/utils/converters';
import { is32ByteHex } from 'src/utils/validators';

class HashNormalizePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    this.validate(value);
    return normalizeHex(value);
  }

  private validate(input: string) {
    if (!is32ByteHex(input)) {
      const message = 'hash should be a valid 32-byte hex string'
      throw new HttpException(message,HttpStatus.BAD_REQUEST, );
    }
  }
}

export { HashNormalizePipe };
