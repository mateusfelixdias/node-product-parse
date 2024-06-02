import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ProductService } from '../product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
    ]),
  ],
  providers: [
    SchedulesService,
    ProductService,
  ],
})
export class SchedulesModule { }
