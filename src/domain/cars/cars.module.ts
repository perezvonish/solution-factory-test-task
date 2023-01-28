import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';
import { CarsService } from './cars.service';
import { CarsRepository } from '../../infrastructure/repositories/cars.repository';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarsEntity, UsersEntity])],
  providers: [CarsService, CarsRepository, Repository<CarsEntity>],
  exports: [CarsService],
})
export class CarsModule {}
