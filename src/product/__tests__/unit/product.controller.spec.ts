import { productsMocks } from '../../../mocks';
import { ProductService } from '../../product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../product.controller';
import { STATUS_PRODUCT } from '../../entities/product.entity';
import { CreateProductDto } from '../../dto/create-product.dto';
import { CustomElasticsearchModule } from '../../../elastic-search/elastic-search.module';
import {
  forwardRef,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('ProductController Unit Tests', () => {
  let service: ProductService;
  let controller: ProductController;

  const productMock = {
    ...productsMocks[0],
    status: STATUS_PRODUCT.published,
  };

  beforeEach(async () => {
    const mockProductService = {
      create: jest.fn().mockResolvedValue(productMock),
      index: jest.fn().mockResolvedValue(productsMocks),
      show: jest.fn().mockResolvedValue(productMock),
      update: jest.fn().mockResolvedValue(productMock),
      destroy: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      imports: [forwardRef(() => CustomElasticsearchModule)],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = productMock;
      const result = await controller.create(createProductDto);

      expect(result).toEqual(productMock);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });

    it('should throw UnprocessableEntityException if validation fails', async () => {
      const createProductDto: CreateProductDto = {} as any;

      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new UnprocessableEntityException('Validation failed');
      });

      await expect(controller.create(createProductDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('index', () => {
    it('should return an array of products', async () => {
      const result = await controller.index();
      expect(result).toEqual(productsMocks);
      expect(service.index).toHaveBeenCalled();
    });
  });

  describe('show', () => {
    it('should return a product by ID', async () => {
      const result = await controller.show('1');
      expect(result).toEqual(productMock);
      expect(service.show).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if product not found', async () => {
      jest
        .spyOn(service, 'show')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.show('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: CreateProductDto = productMock;
      const result = await controller.update('1', updateProductDto);

      expect(result).toEqual(productMock);
      expect(service.update).toHaveBeenCalledWith('1', updateProductDto);
    });
  });

  describe('destroy', () => {
    it('should move a product to trash', async () => {
      await controller.destroy('1');
      expect(service.destroy).toHaveBeenCalledWith('1');
    });
  });
});
