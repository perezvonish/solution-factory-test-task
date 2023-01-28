import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../../infrastructure/repositories/cars.repository';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { CarsEntity } from './cars.entity';
import { UsersEntity } from '../users/users.entity';

export interface CarCreation {
  brand: string;
  title: string;
  serialNumber: string;
  photo?: string;
}

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}

  async createCar(data: CarCreation): Promise<CarsEntity> {
    return await this.carsRepository.save(data);
  }

  async softRemove(entity: CarsEntity): Promise<CarsEntity> {
    return await this.carsRepository.softRemove(entity);
  }

  async findOne(clause: FindOptionsWhere<CarsEntity>) {
    return await this.carsRepository.findOne(clause);
  }

  async checkUniqueSerial(
    serialNumber: string,
  ): Promise<CarsEntity | undefined> {
    const clause: FindOptionsWhere<CarsEntity> = {
      serialNumber: serialNumber,
    };
    return await this.carsRepository.findOne(clause);
  }
}
