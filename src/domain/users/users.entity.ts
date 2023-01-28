import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../config/base';
import { CarsEntity } from '../cars/cars.entity';

@Entity('users')
export class UsersEntity extends Base {
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
  password: string;

  @OneToMany(() => CarsEntity, (cars) => cars.user, {
    cascade: ['update', 'insert'],
  })
  cars: CarsEntity[];

  pushCar(car: CarsEntity) {
    this.cars.push(car);
    return this;
  }
}
