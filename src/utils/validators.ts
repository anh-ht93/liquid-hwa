import { isHex } from 'web3-utils';
import { normalizeHex } from './converters';

const is32ByteHex = (input: any): boolean => {
  const inputAsString = String(input);
  return isHex(inputAsString) && normalizeHex(inputAsString).length == 66;
};

export { is32ByteHex };
