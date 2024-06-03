import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { ProductService } from '../product/product.service';
import { fileNameRequest } from './requests/list-files.request';
import { getFileRequest } from './requests/get-file.request';
import { formatProductData } from './utils/format-product-data';

@Injectable()
export class SchedulesService {
  constructor(
    private productsService: ProductService,
  ) { }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleProductsCron() {
    await this.importProducts();
  }

  private async importProducts(nextUrl = '/food/data/json/index.txt') {
    try {
      const { data } = await fileNameRequest(nextUrl);
      const files = data.split("\n");

      const result = await Promise.all(files.map(async (fileName: string) => {
        if (!fileName.trim()) return;
        const fileContent = await getFileRequest("/food/data/json/", fileName);
        const formattedItems = fileContent.map(formatProductData);

        await this.productsService.createMany(formattedItems);

        return formattedItems;
      }));

      console.log(result);

      return;
    } catch (err) {
      console.error(err);
    }
  }
}
