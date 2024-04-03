import { HttpException, HttpStatus } from '@nestjs/common'
import { RespCode, Resp } from '../constant'

export class ErrorBoundary extends HttpException {

  constructor(error: RespCode | string) {

    super(
      HttpException.createBody({
        code: Resp[error].code,
        message: Resp[error].message,
      }),
      HttpStatus.OK,
    )

  }

}

export default ErrorBoundary  