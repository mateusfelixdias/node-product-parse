import axios from 'axios';
import * as schedule from 'node-schedule';
import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

const ROUTE_TO_GET_PRODUCT_DATA = 'https://challenges.coode.sh/food/data/json/';
const ROUTE_TO_GET_PRODUCT_FILES_NAME = 'https://challenges.coode.sh/food/data/json/index.txt';

export const api_food = axios.create({
  baseURL: "https://challenges.coode.sh",
});
