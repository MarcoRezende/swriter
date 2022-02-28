import { Controller, Delete, Get } from '@nestjs/common';
import type { CrudController } from '@nestjsx/crud';
import type { DescriptionProps } from 'src/_common/decorators/description.decorator';
import { entityDescription } from 'src/_common/decorators/description.decorator';
import type { DeleteResult } from 'typeorm';

import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@Controller('theme')
export class ThemeAdminController implements CrudController<Theme> {
  constructor(public service: ThemeService) {}

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(Theme);
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
