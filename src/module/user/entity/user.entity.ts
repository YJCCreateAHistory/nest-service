import { IsOptional, isEmpty } from 'class-validator'
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm'

@Entity('user')

export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  uid: string

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  phone_number: string

  @Column()
  create_time: Date

  @Column()
  @IsOptional()
  update_time: Date

  @Column({ length: 255 })
  psd: string;
}