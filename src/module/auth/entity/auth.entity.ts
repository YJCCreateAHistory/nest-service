import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsArray } from 'class-validator';

@Entity('auth_tree')
export class AuthTreeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  @IsString()
  uid: string;

  @Column()
  @IsArray()
  authTree: string;

  @Column()
  @IsString()
  create_time: string;

  @Column()
  @IsString()
  update_time: string;
}
