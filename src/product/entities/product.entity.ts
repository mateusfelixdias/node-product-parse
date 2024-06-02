import { Transform } from 'class-transformer';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

export type ProductDocument = Product & Document;

export enum STATUS_PRODUCT {
  draft = 'draft',
  trash = 'trash',
  published = 'published',
}

@Entity({ name: 'products' })
export class Product {
  @Transform(({ obj }) => obj._id.toString(), { toClassOnly: true })
  @ObjectIdColumn()
  _id: string;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'string' })
  status: STATUS_PRODUCT;

  @Column({ type: 'date' })
  imported_t: Date;

  @Column({ type: 'string' })
  url: string;

  @Column({ type: 'string' })
  creator: string;

  @Column({ type: 'date' })
  created_t: Date;

  @Column({ type: 'date' })
  last_modified_t: Date;

  @Column({ type: 'string' })
  product_name: string;

  @Column({ type: 'string' })
  quantity: string;

  @Column({ type: 'string' })
  brands: string;

  @Column({ type: 'string' })
  categories: string;

  @Column({ type: 'string' })
  labels: string;

  @Column({ type: 'string' })
  cities: string;

  @Column({ type: 'string' })
  purchase_places: string;

  @Column({ type: 'string' })
  stores: string;

  @Column({ type: 'string' })
  ingredients_text: string;

  @Column({ type: 'string' })
  traces: string;

  @Column({ type: 'string' })
  serving_size: string;

  @Column({ type: 'numeric' })
  serving_quantity: number;

  @Column({ type: 'numeric' })
  nutriscore_score: number;

  @Column({ type: 'string' })
  nutriscore_grade: string;

  @Column({ type: 'string' })
  main_category: string;

  @Column({ type: 'string' })
  image_url: string;
}
