import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesService } from './schedules/schedules.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ormConfig } from '@database/config/ormconfig';
import { ProductModule } from './product/product.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig() as TypeOrmModuleOptions),
    ScheduleModule.forRoot(),

    ProductModule,
    SchedulesModule
  ],
  controllers: [AppController],
  providers: [AppService, SchedulesService],
})
export class AppModule { }
