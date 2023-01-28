import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import { AuthRegister } from '../../domain/auth/infrastructure/auth.dto';
import { UsersEntity } from '../../domain/users/users.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: AuthRegister): Promise<UsersEntity> {
    return await this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
