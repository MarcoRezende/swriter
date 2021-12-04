import { getManager } from 'typeorm';

import { BadRequestException, Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Hint } from './entities/hint.entity';
import { HintsService } from './hints.service';

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

  @Get('random')
  async getRandomHint(): Promise<Hint> {
    const hint = await this.service.getRandom(getManager());

    return this.service.repo.save({
      ...hint,
      timesDrawn: hint.timesDrawn + 1,
    });
  }
}
