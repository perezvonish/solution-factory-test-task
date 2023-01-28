import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WashboxEntity } from '../../domain/washbox/washbox.entity';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class WashboxRepository {
  constructor(
    @InjectRepository(WashboxEntity)
    private readonly repo: Repository<WashboxEntity>,
  ) {}

  async findOne(
    clause: FindOptionsWhere<WashboxEntity>,
  ): Promise<WashboxEntity> {
    const where: FindOneOptions<WashboxEntity> = {
      where: clause,
    };
    return this.repo.findOne(where);
  }

  async save(data): Promise<WashboxEntity> {
    let entity = data;
    if (!(entity instanceof WashboxEntity)) {
      entity = WashboxEntity.create(data);
    }
    return await this.repo.save(entity);
  }

  async update(
    where: FindOptionsWhere<WashboxEntity>,
    data: QueryDeepPartialEntity<WashboxEntity>,
  ): Promise<UpdateResult> {
    return await this.repo.update(where, data);
  }

  async softRemove(entity: WashboxEntity): Promise<WashboxEntity> {
    return await this.repo.softRemove(entity);
  }
}
