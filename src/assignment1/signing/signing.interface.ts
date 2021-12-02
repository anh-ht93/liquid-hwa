interface SigningRequest {
  message: string;
  privateKey: string;
}

interface SigningDTO {
  message: Uint8Array;
  privateKey: Uint8Array;
}

interface SigningResponse {
  signature: string;
}

interface PublicKeyResponse {
  publicKey: string;
}

export { SigningRequest, SigningDTO, SigningResponse, PublicKeyResponse };
