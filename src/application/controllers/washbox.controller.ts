import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WashboxService } from '../../domain/washbox/washbox.service';
import {
  UpdateWashbox,
  WashboxBook,
  WashboxCreate,
  WashboxRemove,
} from '../../domain/washbox/infrastructure/washbox.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { WashboxEntity } from '../../domain/washbox/washbox.entity';

@Controller('washbox/v1')
export class WashboxController {
  constructor(private readonly washboxService: WashboxService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createWashbox(@Body() body: WashboxCreate): Promise<WashboxEntity> {
    return this.washboxService.createWashbox(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateWashbox(@Body() body: UpdateWashbox): Promise<UpdateResult> {
    return await this.washboxService.updateWashbox(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  async removeWashbox(@Body() body: WashboxRemove): Promise<WashboxEntity> {
    return await this.washboxService.removeWashbox(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/book')
  async bookWashbox(@Body() body: WashboxBook, @Request() req) {
    return await this.washboxService.bookWashbox(body, req.user);
  }
}
