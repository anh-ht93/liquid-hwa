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
      throw new HttpException(
        'hash should be a valid 32-byte hex string',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

export { HashNormalizePipe };
