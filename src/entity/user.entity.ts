import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('account')
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  nickname: string;
}
