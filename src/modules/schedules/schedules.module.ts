import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ProductService } from '../product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ElasticSearchService } from '../elastic-search/elastic-search.service';
import { CustomElasticsearchModule } from '../elastic-search/elastic-search.module';
import { ElasticsearchService } from '@nestjs/elasticsearch';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      CustomElasticsearchModule
    ]),
  ],
  providers: [
    SchedulesService,
    ProductService,
  ],
})
export class SchedulesModule { }
