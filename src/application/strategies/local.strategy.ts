import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthLogin } from '../../domain/auth/infrastructure/auth.dto';
import { AuthService } from '../../domain/auth/auth.service';

export interface UserResponse {
  id: number;
  email?: string;
  phonenumber?: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'contact',
    });
  }

  async validate(contact: string, password: string): Promise<UserResponse> {
    return await this.authService.validateUser({
      contact,
      password,
    });
  }
}
