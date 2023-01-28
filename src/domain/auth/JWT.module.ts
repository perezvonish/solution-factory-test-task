import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { TokensModule } from '../tokens/tokens.module';
import { JwtStrategy } from '../../application/strategies/jwt.strategy';
import { JwtAuthGuard } from '../../application/guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET.toString(),
      signOptions: { expiresIn: '1d' },
    }),
    TokensModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtModule],
})
export class JWTModule {}
