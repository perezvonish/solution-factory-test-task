import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokensEntity } from '../../domain/tokens/tokens.entity';
import {
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class TokensRepository {
  constructor(
    @InjectRepository(TokensEntity)
    private readonly repo: Repository<TokensEntity>,
  ) {}

  async findOne(clause: FindOptionsWhere<TokensEntity>): Promise<TokensEntity> {
    const where: FindOneOptions<TokensEntity> = {
      where: clause,
    };
    return this.repo.findOne(where);
  }

  async save(data): Promise<TokensEntity> {
    let entity = data;
    if (!(entity instanceof TokensEntity)) {
      entity = TokensEntity.create(data);
    }
    return await this.repo.save(entity);
  }

  async syncAndDelete(): Promise<DeleteResult> {
    return this.repo
      .createQueryBuilder('tokens')
      .delete()
      .from(TokensEntity)
      .where('expiresAt < :date', { date: new Date() })
      .execute();
  }
}
