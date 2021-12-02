import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import {
  SigningDTO,
  SigningRequest,
  SigningResponse,
  PublicKeyResponse,
} from 'src/assignment1/signing/signing.interface';
import {
  KeyMapperPipe,
  SigningRequestMapperPipe,
} from 'src/assignment1/signing/signing.pipe';
import { SigningService } from 'src/assignment1/signing/signing.service';
import {
  VerifyingDTO,
  VerifyingResponse,
} from 'src/assignment1/verifying/verifying.interface';
import { VerifyingRequestMapperPipe } from 'src/assignment1/verifying/verifying.pipe';
import { VerifyingService } from 'src/assignment1/verifying/verifying.service';

@Controller('assignment1')
export class Assignments1Controller {
  constructor(
    private signingService: SigningService,
    private verifyingService: VerifyingService,
  ) {}

  @Post('sign')
  @UsePipes(SigningRequestMapperPipe)
  async sign(@Body() payload: SigningDTO): Promise<SigningResponse> {
    return {
      signature: this.signingService.sign(payload).signature,
    };
  }

  @Post('publicKey')
  @UsePipes(KeyMapperPipe)
  async createPublicKey(
    @Body('key') key: Uint8Array,
  ): Promise<PublicKeyResponse> {
    return {
      publicKey: this.signingService.createPublicKey(key).publicKey,
    };
  }

  @Post('verify')
  @UsePipes(VerifyingRequestMapperPipe)
  async verify(@Body() payload: VerifyingDTO): Promise<VerifyingResponse> {
    return {
      result: this.verifyingService.verify(payload),
    };
  }
}
