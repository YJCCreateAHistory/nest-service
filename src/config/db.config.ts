import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { UserEntity } from 'src/module/user/entity/user.entity'
import { AuthTreeEntity } from 'src/module/auth/entity/auth.entity'
import { TokenEntity } from 'src/module/auth/entity/token.entity'
import { RefreshTokenEntity } from 'src/module/auth/entity/refresh.entity'

export const getSqlConfigure = (): MysqlConnectionOptions => {

  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [UserEntity, AuthTreeEntity, TokenEntity, RefreshTokenEntity],
    synchronize: true,
  }
}