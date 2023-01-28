import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from '../../domain/cars/cars.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CarsRepository {
  constructor(
    @InjectRepository(CarsEntity)
    private readonly repo: Repository<CarsEntity>,
  ) {}

  async findOne(
    clause: FindOptionsWhere<CarsEntity>,
  ): Promise<CarsEntity | undefined> {
    const where: FindOneOptions<CarsEntity> = {
      where: clause,
    };

    return this.repo.findOne(where);
  }

  async save(data): Promise<CarsEntity> {
    let entity = data;
    if (!(entity instanceof CarsEntity)) {
      entity = CarsEntity.create(data);
    }
    return await this.repo.save(entity);
  }

  async softRemove(entity: CarsEntity): Promise<CarsEntity> {
    return await this.repo.softRemove(entity);
  }
}
