import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../product.service';
import { productsMocks as mocks } from '../../../mocks';
import { NotFoundException, forwardRef } from '@nestjs/common';
import { Product, STATUS_PRODUCT } from '../../entities/product.entity';
import { CustomElasticsearchModule } from '../../../elastic-search/elastic-search.module';

describe('ProductService Unit Tests', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  const productsMocks = mocks.map((product) => ({
    ...product,
    _id: new ObjectId().toString(),
    status: product.status as STATUS_PRODUCT,
  }));

  const productMock = {
    ...productsMocks[0],
    status: STATUS_PRODUCT.published,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => CustomElasticsearchModule)],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('index', () => {
    it('should return an array of products', async () => {
      jest.spyOn(productRepository, 'find').mockResolvedValue(productsMocks);

      const result = await service.index();
      expect(result).toEqual(productsMocks);
    });

    it('should return default number of products for default pagination', async () => {
      const defaultPaginationLimit = 100;
      const products = Array.from({ length: defaultPaginationLimit }, () => ({
        _id: new ObjectId().toString(),
        ...productMock,
      }));

      jest.spyOn(productRepository, 'find').mockResolvedValue(products);

      const result = await service.index();
      expect(result.length).toBe(defaultPaginationLimit);
    });

    it('should return an empty array for a page beyond the limit', async () => {
      const paginationQuery = { skip: 30, take: 10 };

      jest.spyOn(productRepository, 'find').mockResolvedValue([]);

      const result = await service.index(paginationQuery);
      expect(result).toEqual([]);
    });
  });

  describe('show', () => {
    it('should return a product by ID', async () => {
      jest
        .spyOn(productRepository, 'findOneOrFail')
        .mockResolvedValue(productMock);

      const result = await service.show('id');

      expect(result).toEqual(productMock);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest
        .spyOn(productRepository, 'findOneOrFail')
        .mockRejectedValue(new NotFoundException());

      await expect(service.show('id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      jest.spyOn(productRepository, 'update').mockResolvedValue(null);
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(productMock);

      const updatedProduct = await service.update('id', productMock);
      expect(updatedProduct).toEqual(productMock);
    });

    it('should return null if product is not found', async () => {
      jest.spyOn(productRepository, 'update').mockResolvedValue(null);
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      const updatedProduct = await service.update('id', productMock);
      expect(updatedProduct).toBeNull();
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      jest.spyOn(productRepository, 'update').mockResolvedValue(null);

      await service.destroy('id');

      expect(productRepository.update).toHaveBeenCalledWith(
        { _id: 'id' },
        { status: STATUS_PRODUCT.trash },
      );
    });
  });
});
