import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { CarsModule } from './domain/cars/cars.module';
import { TokensModule } from './domain/tokens/tokens.module';
import { VisitsModule } from './domain/visits/visits.module';
import { AuthModule } from './domain/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeOrm.config';
import { WashboxModule } from './domain/washbox/washbox.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    UsersModule,
    CarsModule,
    TokensModule,
    VisitsModule,
    AuthModule,
    WashboxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
