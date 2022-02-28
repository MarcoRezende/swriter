import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import type { EntityManager } from 'typeorm';
import { getRepository } from 'typeorm';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  public repo = getRepository(Category);

  constructor(@InjectRepository(Category) categoryService) {
    super(categoryService);
  }

  async createOneBase(manager: EntityManager, { name }: Partial<Category>) {
    return manager.save(Category, { name });
  }
}
