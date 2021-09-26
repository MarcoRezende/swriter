import { Controller } from '@nestjs/common';
import { HintsService } from './hints.service';
import { Hint } from './entities/hint.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Hint,
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
})
@Controller('hint')
export class HintsController implements CrudController<Hint> {
  constructor(public service: HintsService) {}
}
