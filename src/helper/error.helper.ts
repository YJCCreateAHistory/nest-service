import { HttpException, HttpStatus } from '@nestjs/common'
import { HTTP_CODE, HTTP_OPTION } from '../constant'

export class ErrorBoundary extends HttpException {

  constructor(error: HTTP_CODE | string) {

    super(
      HttpException.createBody({
        code: HTTP_OPTION[error].code,
        message: HTTP_OPTION[error].message,
      }),
      HttpStatus.OK,
    )

  }

}

export default ErrorBoundary  