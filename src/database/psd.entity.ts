import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  OneToOne,
} from 'typeorm'
import { User } from './user.entity'

@Entity('psd')

export class Psd {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  uid: string
  
  @Column({ length: 255 })
  psd: string

  @Column()
  create_time: Date

  @Column()
  update_time: Date

  @OneToOne(() => User, user => user.psd)
  user: User;
}