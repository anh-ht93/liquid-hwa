interface VerifyingRequest {
  message: string;
  publicKey: string;
  signature: string;
}

interface VerifyingDTO {
  message: Uint8Array;
  publicKey: Uint8Array;
  signature: Uint8Array;
}

interface VerifyingResponse {
  result: boolean;
}

export { VerifyingDTO, VerifyingRequest, VerifyingResponse };
