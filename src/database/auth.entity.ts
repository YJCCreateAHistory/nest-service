import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsArray, ValidateNested } from 'class-validator';

class AuthTreeItem {
  @IsString()
  authName: string;

  @IsString()
  authId: string;

  @IsString()
  authType: string;
}

@Entity()
export class AuthTree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  uid: string;

  @Column('jsonb')
  @IsArray()
  @ValidateNested({ each: true })
  authTree: AuthTreeItem[];

  @Column()
  @IsString()
  create_time: string;

  @Column()
  @IsString()
  update_time: string;
}
