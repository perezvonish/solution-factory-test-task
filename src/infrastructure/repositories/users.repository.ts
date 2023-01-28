import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UsersEntity } from '../../domain/users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repo: Repository<UsersEntity>,
  ) {}

  async findOne(clause: FindOptionsWhere<UsersEntity>) {
    return this.repo.findOne({
      where: clause,
      relations: ['cars'],
    });
  }

  async save(data): Promise<UsersEntity> {
    let entity = data;
    if (!(entity instanceof UsersEntity)) {
      entity = UsersEntity.create(data);
    }
    return await this.repo.save(entity);
  }

  async update(
    where: FindOptionsWhere<UsersEntity>,
    data: QueryDeepPartialEntity<UsersEntity>,
  ) {
    return await this.repo.update(where, data);
  }
}
