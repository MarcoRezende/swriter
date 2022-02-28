import { Get, Query } from '@nestjs/common';
import type { CrudController } from '@nestjsx/crud';
import { AppController } from 'src/_common/decorators/app-controller.decorator';
import { getManager } from 'typeorm';

import { Hint } from './entities/hint.entity';
import { HintsService } from './hints.service';

@AppController(Hint, 'hint')
export class HintsAppController implements CrudController<Hint> {
  constructor(public service: HintsService) {}

  @Get('random')
  async getRandomHint(@Query('filter') filters?: string[]): Promise<Hint> {
    const hint = await this.service.getRandom(getManager(), filters);

    return this.service.repo.save({
      ...hint,
      timesDrawn: hint.timesDrawn + 1,
    });
  }
}
