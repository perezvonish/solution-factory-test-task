import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../config/base';
import { UsersEntity } from '../users/users.entity';

@Entity('cars')
export class CarsEntity extends Base {
  @Column({
    type: 'character varying',
    length: 64,
  })
  brand: string;

  @Column({
    type: 'character varying',
    length: 32,
  })
  title: string;

  @Column({
    type: 'character varying',
    length: 9,
  })
  serialNumber: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  photo: string;

  @ManyToOne(() => UsersEntity, (user) => user.cars, {
    cascade: ['remove', 'soft-remove', 'update', 'insert'],
  })
  user: UsersEntity;
}
