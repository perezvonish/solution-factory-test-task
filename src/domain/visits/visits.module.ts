import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitsEntity } from './visits.entity';
import { VisitsService } from './visits.service';
import { UsersModule } from '../users/users.module';
import { VisitsRepository } from '../../infrastructure/repositories/visits.repository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VisitsEntity]), UsersModule],
  providers: [VisitsService, VisitsRepository, Repository<VisitsEntity>],
  exports: [VisitsService],
})
export class VisitsModule {}
