import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { User } from 'src/database/user.entity'
import { Psd } from 'src/database/psd.entity'
export const getSqlConfigure = (): MysqlConnectionOptions => {

  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Psd],
    synchronize: true,
  }
}