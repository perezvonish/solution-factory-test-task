import { Module } from '@nestjs/common';
import { WashboxController } from '../../application/controllers/washbox.controller';
import { WashboxService } from './washbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashboxEntity } from './washbox.entity';
import { WashboxRepository } from '../../infrastructure/repositories/washbox.repository';
import { Repository } from 'typeorm';
import { VisitsModule } from '../visits/visits.module';
import { UsersModule } from '../users/users.module';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WashboxEntity]),
    VisitsModule,
    VisitsModule,
    UsersModule,
    CarsModule,
  ],
  providers: [WashboxService, WashboxRepository, Repository<WashboxEntity>],
  controllers: [WashboxController],
})
export class WashboxModule {}
