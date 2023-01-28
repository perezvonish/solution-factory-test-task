import { Injectable, Logger } from '@nestjs/common';
import { TokensRepository } from '../../infrastructure/repositories/tokens.repository';
import { FindOptionsWhere, MoreThan } from 'typeorm';
import { TokensEntity } from './tokens.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface TokenCreation {
  userId: number;
  email?: string;
  phonenumber?: string;
  token: string;
  expiresAt: Date;
}

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);
  constructor(private readonly tokensRepository: TokensRepository) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncTokens() {
    await this.logger.debug('Sync tokens in database.');
    const result = await this.tokensRepository.syncAndDelete();
    if (!result) {
      await this.logger.debug('Nothing to sync.');
    }
    await this.logger.warn('Sync done.');
  }

  async findOne(token: string): Promise<TokensEntity | undefined> {
    const clause: FindOptionsWhere<TokensEntity> = {
      token: token,
      expiresAt: MoreThan(new Date()),
    };

    return await this.tokensRepository.findOne(clause);
  }

  async save(data: TokenCreation) {
    return await this.tokensRepository.save(data);
  }
}
