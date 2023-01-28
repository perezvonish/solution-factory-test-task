import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UpdateWashbox,
  WashboxBook,
  WashboxCreate,
  WashboxRemove,
} from './infrastructure/washbox.dto';
import { WashboxRepository } from '../../infrastructure/repositories/washbox.repository';
import { ArrayContains, FindOptionsWhere, UpdateResult } from 'typeorm';
import { WashboxEntity } from './washbox.entity';
import {
  CarsNotFoundSerial,
  NotUserCar,
  WashboxCarAvaliability,
  WashboxNotFound,
} from '../../application/handlers/exceptions';
import { UserData, UsersService } from '../users/users.service';
import { CarsService } from '../cars/cars.service';
import { VisitCreation, VisitsService } from '../visits/visits.service';
import { CarsEntity } from '../cars/cars.entity';
import { addHours } from 'date-fns';

@Injectable()
export class WashboxService {
  constructor(
    private readonly washboxRepository: WashboxRepository,
    private readonly usersService: UsersService,
    private readonly carsService: CarsService,
    private readonly visitsService: VisitsService,
  ) {}

  async createWashbox(data: WashboxCreate): Promise<WashboxEntity> {
    return await this.washboxRepository.save(data);
  }

  async updateWashbox(data: UpdateWashbox): Promise<UpdateResult> {
    const clause: FindOptionsWhere<WashboxEntity> = {
      id: data.id,
    };

    const box = await this.washboxRepository.findOne(clause);
    if (!box) {
      throw new NotFoundException(WashboxNotFound);
    }

    return await this.washboxRepository.update(clause, data);
  }

  async removeWashbox(data: WashboxRemove): Promise<WashboxEntity> {
    const clause: FindOptionsWhere<WashboxEntity> = {
      id: data.id,
    };

    const entity: WashboxEntity = await this.washboxRepository.findOne(clause);
    if (!entity) {
      throw new NotFoundException(WashboxNotFound);
    }

    return await this.washboxRepository.softRemove(entity);
  }

  async bookWashbox(data: WashboxBook, userData: UserData) {
    const clause: FindOptionsWhere<CarsEntity> = {
      id: data.carId,
    };
    const car = await this.carsService.findOne(clause);

    if (!car) {
      throw new NotFoundException(CarsNotFoundSerial);
    }

    const visit = await this.visitsService.checkAvaliability(
      data.id,
      userData.id,
      data.carId,
    );

    if (visit) {
      throw new BadRequestException(WashboxCarAvaliability);
    }

    const visitCreation: VisitCreation = {
      washboxId: data.id,
      userId: userData.id,
      carId: data.carId,
      expiresAt: addHours(new Date(), 1),
    };

    return await this.visitsService.save(visitCreation);
  }
}
