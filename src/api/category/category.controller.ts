import { BadRequestException, Controller, Delete, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import {
  DescriptionProps,
  entityDescription,
} from 'src/_common/decorators/description.decorator';
import { DeleteResult } from 'typeorm';

import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Crud({
  model: {
    type: Category,
  },
  query: {
    alwaysPaginate: true,
    maxLimit: 50,
    join: { theme: { eager: true } },
  },
  routes: {
    createOneBase: {},
    createManyBase: {},
    getOneBase: {},
    getManyBase: {},
    updateOneBase: {},
    deleteOneBase: {},
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  validation: { exceptionFactory: errors => new BadRequestException(errors) },
})
@Controller('category')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(Category);
  }

  @Delete()
  async deleteAll(): Promise<DeleteResult> {
    return await this.service.repo
      .createQueryBuilder('theme')
      .delete()
      .where('id IS NOT NULL')
      .execute();
  }
}
