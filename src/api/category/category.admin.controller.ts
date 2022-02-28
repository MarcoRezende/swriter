import { AdminController } from '@decorators/admin-controller.decorator';
import { Delete, Get } from '@nestjs/common';
import type { CrudController } from '@nestjsx/crud';
import type { DescriptionProps } from 'src/_common/decorators/description.decorator';
import { entityDescription } from 'src/_common/decorators/description.decorator';
import type { DeleteResult } from 'typeorm';

import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@AdminController(Category, 'category')
export class CategoryAdminController implements CrudController<Category> {
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
