import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from 'express';

@Catch(Error)
export default class HttpExceptionFilter extends BaseExceptionFilter<Error> {
    override catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const message =  exception.message ?? 'Internal server error'


        response
            .status(statusCode)
            .json({
                statusCode,
                message,
                timestamp: new Date().toISOString(),
            })
    }
}