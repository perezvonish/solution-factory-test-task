import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  CarCreation,
  RemoveCar,
} from '../../domain/cars/infrastructure/cars.dto';
import { UsersService } from '../../domain/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users/v1')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add-car')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './static',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async addCarToUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query() query: CarCreation,
    @Request() req,
  ) {
    return await this.userService.addCarToUser(query, req.user, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove-car')
  async removeCarFromUser(@Query() query: RemoveCar) {
    return await this.userService.removeCarFromUser(query);
  }
}
