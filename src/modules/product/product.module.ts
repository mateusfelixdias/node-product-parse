import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Module, forwardRef } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CustomElasticsearchModule } from '../elastic-search/elastic-search.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CustomElasticsearchModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
