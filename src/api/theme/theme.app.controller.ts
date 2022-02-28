import { AppController } from '@decorators/app-controller.decorator';
import type { CrudController } from '@nestjsx/crud';

import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@AppController(Theme, 'theme')
export class ThemeAppController implements CrudController<Theme> {
  constructor(public service: ThemeService) {}
}
