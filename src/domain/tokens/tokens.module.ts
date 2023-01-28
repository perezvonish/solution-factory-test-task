import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensRepository } from '../../infrastructure/repositories/tokens.repository';
import { Repository } from 'typeorm';
import { TokensEntity } from './tokens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TokensEntity])],
  providers: [TokensService, TokensRepository, Repository<TokensEntity>],
  exports: [TokensService],
})
export class TokensModule {}
