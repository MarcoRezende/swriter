import { AppController } from '@decorators/app-controller.decorator';
import type { CrudController } from '@nestjsx/crud';

import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@AppController(Category, 'category')
export class CategoryAppController implements CrudController<Category> {
  constructor(public service: CategoryService) {}
}
