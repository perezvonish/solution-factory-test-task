import { Column, Entity } from 'typeorm';
import { Base } from '../../config/base';

@Entity('visits')
export class VisitsEntity extends Base {
  @Column({
    type: 'int',
  })
  washboxId: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  carId: number;

  @Column({
    type: 'timestamptz',
  })
  expiresAt: Date;
}
