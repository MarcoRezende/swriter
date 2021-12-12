import { BadRequestException, Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

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
}
