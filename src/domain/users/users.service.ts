import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { FindOptionsWhere } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UserCreate } from './infrastructure/users.dto';
import { CarsService } from '../cars/cars.service';
import { CarCreation, RemoveCar } from '../cars/infrastructure/cars.dto';
import {
  CarsNotFoundSerial,
  CarsUniqueSerialNumber,
  UserNotFoundException,
} from '../../application/handlers/exceptions';
import { CarsEntity } from '../cars/cars.entity';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export interface UserData {
  id: number;
  email: string | null;
  phonenumber: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly carsService: CarsService,
  ) {}

  async addCarToUser(
    data: CarCreation,
    userData: UserData,
    photoFile?: Express.Multer.File,
  ): Promise<UsersEntity> {
    const fileName = photoFile.originalname;

    const clause: FindOptionsWhere<UsersEntity> = {
      id: userData.id,
    };

    const expectCar = await this.carsService.checkUniqueSerial(
      data.serialNumber,
    );
    if (expectCar) {
      throw new BadRequestException(CarsUniqueSerialNumber);
    }

    const user = await this.findOne(clause);
    if (!user) {
      throw new NotFoundException(UserNotFoundException);
    }

    const carCreation: CarCreation = {
      serialNumber: data.serialNumber,
      brand: data.brand,
      title: data.title,
      photo: fileName,
    };

    const car = await this.carsService.createCar(carCreation);
    if (!user.cars) {
      user.cars = [];
    }

    await user.pushCar(car);

    return await this.save(user);
  }

  async removeCarFromUser(data: RemoveCar): Promise<CarsEntity> {
    const car = await this.carsService.checkUniqueSerial(data.serialNumber);
    if (!car) {
      throw new NotFoundException(CarsNotFoundSerial);
    }

    return await this.carsService.softRemove(car);
  }

  async findOne(
    clause: FindOptionsWhere<UsersEntity>,
  ): Promise<UsersEntity | undefined> {
    return await this.usersRepository.findOne(clause);
  }

  async save(user: UserCreate): Promise<UsersEntity> {
    return await this.usersRepository.save(user);
  }
}
