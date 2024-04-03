import { UserEntity } from "src/module/user/entity/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne } from "typeorm";
import { RefreshTokenEntity } from "./refresh.entity";

@Entity('access_token') 

export class TokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;
    
  @Column()
  accessToken: string;

  @Column()
  create_at: Date;

  @Column()
  expired_at: Date;

  @OneToOne(() => RefreshTokenEntity, refreshToken => refreshToken.accessToken, {
    cascade: true,
  })
  refreshToken: RefreshTokenEntity

  @JoinColumn({ name: 'uid' })
  user: UserEntity

}