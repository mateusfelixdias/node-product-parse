export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;
  findAll(): Promise<T[]>;
  findByCondition(filterCondition: any): Promise<T>;
  findWithRelations(relations: any): Promise<T[]>;
}
