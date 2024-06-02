import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, STATUS_PRODUCT } from './entities/product.entity';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const result = await this.productRepository.insert(createProductDto);
    const { identifiers } = result;
    const _id = identifiers[0]._id;

    return { ...createProductDto, _id };
  }

  async index(paginationQuery?: PaginationQueryDto) {
    const { skip = 0, take = 100 } = paginationQuery ?? {};

    return await this.productRepository.find({
      skip,
      take,
    });
  }

  async show(id: string) {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { _id: id },
      });

      return product;
    } catch {
      throw new NotFoundException(`Product not found`);
    }
  }

  async update(id: string, createProductDto: CreateProductDto) {
    await this.productRepository.update({ _id: id }, createProductDto);
    return await this.productRepository.findOneBy({ _id: id });
  }

  async destroy(id: string): Promise<void> {
    await this.productRepository.update(
      { _id: id },
      {
        status: STATUS_PRODUCT.trash,
      },
    );
  }
}
