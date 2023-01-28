import { Module } from '@nestjs/common';
import { AuthController } from '../../application/controllers/auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../application/strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { JWTModule } from './JWT.module';
import { LocalAuthGuard } from '../../application/guards/local-auth.guard';

@Module({
  imports: [UsersModule, PassportModule, TokensModule, JWTModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
