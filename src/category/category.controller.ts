import { Body, Controller, ForbiddenException } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { getManager } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';

@Crud({
  model: {
    type: Category,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('Category')
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}
