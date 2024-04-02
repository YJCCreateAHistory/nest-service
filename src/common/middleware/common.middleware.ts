import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'

@Injectable()
export class CommonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 在这里可以拦截设置的请求操作
    next()
  }
}