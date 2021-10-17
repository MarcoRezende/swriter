import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@Crud({
  model: {
    type: Theme,
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
})
@Controller('theme')
export class ThemeController implements CrudController<Theme> {
  constructor(public service: ThemeService) {}
}
