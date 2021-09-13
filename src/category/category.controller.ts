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

  @Override()
  async createOne(@Body() { name }: Partial<Category>) {
    const manager = getManager();

    const isNameAlreadyTaken = await this.service.findOne({ name });

    if (isNameAlreadyTaken)
      throw new ForbiddenException('Name already taken!', 'NAME_ALREADY_TAKEN');

    return this.service.createOneBase(manager, { name });
  }
}
