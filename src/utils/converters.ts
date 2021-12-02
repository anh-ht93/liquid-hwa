import { sha3, hexToBytes as toBytes } from 'web3-utils';

const utf8ToSha3 = (utf8String: string): Uint8Array => {
  const hex = sha3(utf8String);
  return hexToBytes(hex);
};

const normalizeHex = (hex: string): string => {
  return hex.startsWith('0x') ? hex : `0x${hex}`;
};

const hexToBytes = (hex: string): Uint8Array => {
  const buffer = toBytes(normalizeHex(hex));
  return Uint8Array.from(buffer);
};

const bytesToHexString = (byte: Uint8Array): string => {
  const buffer = Buffer.from(byte);
  return buffer.toString('hex');
};

export { utf8ToSha3, hexToBytes, bytesToHexString, normalizeHex };
