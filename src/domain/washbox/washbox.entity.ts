import { Column, Entity } from 'typeorm';
import { Base } from '../../config/base';

@Entity('washboxes')
export class WashboxEntity extends Base {
  @Column({
    type: 'character varying',
    length: 16,
  })
  title: string;
}
