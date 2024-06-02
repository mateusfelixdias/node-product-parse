import { ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import {
  Get,
  Body,
  Post,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Returns a specific product data.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of product.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async index(@Query() paginationQuery?: PaginationQueryDto) {
    return await this.productService.index(paginationQuery);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a specific product data.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'profile not found.' })
  async show(@Param('id') id: string) {
    return await this.productService.show(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updates a specific data.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.update(id, createProductDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Deletes a specific Product.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.productService.destroy(id);
  }
}
