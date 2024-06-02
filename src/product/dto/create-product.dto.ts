import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { STATUS_PRODUCT } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ type: 'integer' })
  @IsNumber()
  code: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  status: STATUS_PRODUCT;

  @ApiProperty({ type: 'date' })
  imported_t: Date;

  @ApiProperty({ type: 'string' })
  @IsString()
  url: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  creator: string;

  @ApiProperty({ type: 'date' })
  created_t: Date;

  @ApiProperty({ type: 'date' })
  last_modified_t: Date;

  @ApiProperty({ type: 'string' })
  @IsString()
  product_name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  quantity: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  brands: string;

  @ApiProperty({ type: 'string' })
  categories: string;

  @ApiProperty({ type: 'string' })
  labels: string;

  @ApiProperty({ type: 'string' })
  cities: string;

  @ApiProperty({ type: 'string' })
  purchase_places: string;

  @ApiProperty({ type: 'string' })
  stores: string;

  @ApiProperty({ type: 'string' })
  ingredients_text: string;

  @ApiProperty({ type: 'string' })
  traces: string;

  @ApiProperty({ type: 'string' })
  serving_size: string;

  @ApiProperty({ type: 'numeric' })
  @IsNumber()
  serving_quantity: number;

  @ApiProperty({ type: 'numeric' })
  @IsNumber()
  nutriscore_score: number;

  @ApiProperty({ type: 'string' })
  nutriscore_grade: string;

  @ApiProperty({ type: 'string' })
  main_category: string;

  @ApiProperty({ type: 'string' })
  image_url: string;
}
