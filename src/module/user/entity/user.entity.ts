import { IsOptional } from 'class-validator'
import { Exclude } from 'class-transformer'
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm'

@Entity('user')

export class UserEntity {

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number

  @Column({ length: 255 })
  uid: string

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  phone_number: string

  @Exclude()
  @Column()
  create_time: Date

  @Exclude()
  @Column()
  @IsOptional()
  update_time: Date

  @Exclude()
  @Column({ length: 255 })
  psd: string;
}