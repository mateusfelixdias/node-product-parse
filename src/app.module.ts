import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleService } from './services';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ormConfig } from '@database/config/ormconfig';
import { ProductModule } from './product/product.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomElasticsearchModule } from './elastic-search/elastic-search.module';

@Module({
  imports: [
    ProductModule,
    CustomElasticsearchModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig() as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
