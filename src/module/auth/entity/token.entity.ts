import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity() 

export class TokenEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ length: 255 })
  value: string;
    
  @Column()
  accessToken: string;

  @Column()
  create_time: string;

  @Column()
  expired_time: string;
}