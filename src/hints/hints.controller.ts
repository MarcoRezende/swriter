import { BadRequestException, Controller } from '@nestjs/common';
import { HintsService } from './hints.service';
import { Hint } from './entities/hint.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Hint,
  },
  routes: {
    createOneBase: {},
    createManyBase: {},
    getOneBase: {},
    getManyBase: {},
    updateOneBase: {},
    deleteOneBase: {},
  },
  query: {
    join: {
      categories: { eager: true },
    },
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
@Controller('hint')
export class HintsController implements CrudController<Hint> {
  constructor(public service: HintsService) {}
}
