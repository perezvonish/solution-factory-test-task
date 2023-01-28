import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { VisitsEntity } from '../../domain/visits/visits.entity';

@Injectable()
export class VisitsRepository {
  constructor(
    @InjectRepository(VisitsEntity)
    private readonly repo: Repository<VisitsEntity>,
  ) {}

  async findOne(clause: FindOptionsWhere<VisitsEntity>): Promise<VisitsEntity> {
    const where: FindOneOptions<VisitsEntity> = {
      where: clause,
    };
    return this.repo.findOne(where);
  }

  async save(data): Promise<VisitsEntity> {
    let entity = data;
    if (!(entity instanceof VisitsEntity)) {
      entity = VisitsEntity.create(data);
    }
    return await this.repo.save(entity);
  }

  async update(
    where: FindOptionsWhere<VisitsEntity>,
    data: QueryDeepPartialEntity<VisitsEntity>,
  ): Promise<UpdateResult> {
    return await this.repo.update(where, data);
  }

  async softRemove(entity: VisitsEntity): Promise<VisitsEntity> {
    return await this.repo.softRemove(entity);
  }

  async syncAndDelete(): Promise<DeleteResult> {
    return this.repo
      .createQueryBuilder('visits')
      .delete()
      .from(VisitsEntity)
      .where('expiresAt < :date', { date: new Date() })
      .execute();
  }
}
