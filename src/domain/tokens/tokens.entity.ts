import { Column, Entity } from 'typeorm';
import { Base } from '../../config/base';

@Entity('tokens')
export class TokensEntity extends Base {
  @Column({
    type: 'character varying',
    length: 32,
    nullable: true,
  })
  email?: string;

  @Column({
    type: 'character varying',
    length: 32,
    nullable: true,
  })
  phonenumber?: string;

  @Column({
    type: 'character varying',
  })
  token: string;

  @Column({
    type: 'timestamptz',
  })
  expiresAt: Date;
}
