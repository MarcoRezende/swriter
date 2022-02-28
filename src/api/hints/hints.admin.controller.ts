import { AdminController } from '@decorators/admin-controller.decorator';
import type { DescriptionProps } from '@decorators/description.decorator';
import { entityDescription } from '@decorators/description.decorator';
import {
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { CrudController } from '@nestjsx/crud';
import { diskStorage } from 'multer';
import type { DeleteResult } from 'typeorm';

import { Hint } from './entities/hint.entity';
import { HintsService } from './hints.service';

@AdminController(Hint, 'hint', {
  query: {
    join: {
      categories: { eager: true },
      'categories.theme': { eager: true },
    },
  },
})
export class HintsAdminController implements CrudController<Hint> {
  constructor(public service: HintsService) {}

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(Hint);
  }

  @Post('importCsv')
  @UseInterceptors(
    FileInterceptor('file', { storage: diskStorage({ destination: './tmp' }) }),
  )
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    await this.service.parseCsv(file);
  }

  @Delete()
  async deleteAll(): Promise<DeleteResult> {
    return await this.service.repo
      .createQueryBuilder('hint')
      .delete()
      .where('id IS NOT NULL')
      .execute();
  }
}
