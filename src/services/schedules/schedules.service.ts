import axios from 'axios';
import * as schedule from 'node-schedule';
import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

const ROUTE_TO_GET_PRODUCT_DATA = 'https://challenges.coode.sh/food/data/json/';
const ROUTE_TO_GET_PRODUCT_FILES_NAME =
  'https://challenges.coode.sh/food/data/json/index.txt';

@Injectable()
export class ScheduleService {
  constructor(private readonly productService: ProductService) {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 13;
    rule.minute = 34;

    schedule.scheduleJob(rule, () => {});
  }
}
