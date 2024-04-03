import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne } from "typeorm";
import { TokenEntity } from './token.entity';

@Entity('refresh_token')

export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  refreshToken: string;

  @Column()
  create_at: Date;

  @Column()
  expired_at: Date;

  @OneToOne(() => TokenEntity, accessToken => accessToken.refreshToken, {
    onDelete: 'CASCADE',
  })

  @JoinColumn()
  accessToken: TokenEntity

}