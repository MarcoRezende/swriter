import { Controller } from '@nestjs/common';
import { HintsService } from './hints.service';
import { Hint } from './entities/hint.entity';
import { CrudController } from '@nestjsx/crud';

@Controller('hints')
export class HintsController implements CrudController<Hint> {
  constructor(public service: HintsService) {}
}
