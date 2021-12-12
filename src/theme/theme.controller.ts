import { BadRequestException, Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@Crud({
  model: {
    type: Theme,
  },
  query: {
    alwaysPaginate: true,
    maxLimit: 50,
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
@Controller('theme')
export class ThemeController implements CrudController<Theme> {
  constructor(public service: ThemeService) {}
}
