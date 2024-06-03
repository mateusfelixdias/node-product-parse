import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, STATUS_PRODUCT } from './entities/product.entity';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.productRepository.insert(createProductDto);
      const { identifiers } = result;
      const _id = identifiers[0]._id;

      const product = { ...createProductDto, _id };

      return product;
    } catch (error) {
      console.error(error.meta.body);
      throw new InternalServerErrorException();
    }
  }

  async createMany(createProductsDto: CreateProductDto[]) {
    const result = await this.productRepository.insert(createProductsDto);
    const { identifiers } = result;

    return createProductsDto.map((product, index) => ({
      ...product,
      _id: identifiers[index]._id,
    }));
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
