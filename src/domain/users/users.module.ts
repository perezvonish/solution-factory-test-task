import { Module } from '@nestjs/common';
import { UsersController } from '../../application/controllers/users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CarsEntity } from '../cars/cars.entity';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, CarsEntity]), CarsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Repository<UsersEntity>],
  exports: [UsersService],
})
export class UsersModule {}
