import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
} from 'typeorm'
import { Psd } from './psd.entity'

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
  update_time: Date
  
  @OneToOne(() => Psd, psd => psd.user)
  psd: Psd;
}