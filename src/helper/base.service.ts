import { HttpException } from "@nestjs/common"
import { Repository, ObjectLiteral } from 'typeorm'

export class BaseService<T extends ObjectLiteral, K extends Repository<T> = Repository<T>> {

  constructor(private readonly repository: K) {

  }

  create(dto: any) {
    return this.repository.save(dto)
  }

  upgrade(uid: string, dto: any) { 
    return this.repository.update(uid, dto)
  }

  async delete(uid: string) {
    const item = await this.repository.createQueryBuilder().where({ uid }).getOne()
    if (!item) {
      throw new HttpException('Not Found', 404)
    }
    return this.repository.remove(item)
  }

  async findOne(uid: string) {
    const item = await this.repository.createQueryBuilder().where({ uid }).getOne()
    if (!item) {
      throw new HttpException('Not Found', 404)
    }
    return item
  }

}