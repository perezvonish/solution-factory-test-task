import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { VisitsRepository } from '../../infrastructure/repositories/visits.repository';
import { MoreThan } from 'typeorm';
import { VisitsEntity } from './visits.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  CarNotFree,
  WashboxNotEmpty,
} from '../../application/handlers/exceptions';

export interface VisitCreation {
  washboxId: number;
  userId: number;
  carId: number;
  expiresAt: Date;
}

@Injectable()
export class VisitsService {
  private readonly logger = new Logger(VisitsService.name);
  constructor(private readonly visitsRepository: VisitsRepository) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async syncVisits() {
    await this.logger.debug('Sync visits in database.');
    const result = await this.visitsRepository.syncAndDelete();
    if (!result) {
      await this.logger.debug('Nothing to sync.');
    }
    await this.logger.warn('Sync done.');
  }

  async save(data: VisitCreation): Promise<VisitsEntity> {
    return await this.visitsRepository.save(data);
  }

  async checkAvaliability(washboxId: number, userId: number, carId: number) {
    const date = new Date();

    const car = await this.visitsRepository.findOne({
      carId: carId,
      expiresAt: MoreThan(date),
    });

    const washbox = await this.visitsRepository.findOne({
      washboxId: washboxId,
      expiresAt: MoreThan(date),
    });

    if (car) {
      throw new BadRequestException(CarNotFree);
    }

    if (washbox) {
      throw new BadRequestException(WashboxNotEmpty);
    }

    return true;
  }
}
