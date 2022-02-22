import {
  DescriptionProps,
  entityDescription,
} from '@decorators/description.decorator';
import {
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrudController } from '@nestjsx/crud';
import { diskStorage } from 'multer';
import { AppController } from 'src/_common/decorators/app-controller.decorator';
import { DeleteResult, getManager } from 'typeorm';

import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { UserRole } from '../user/entities/user.entity';
import { Hint } from './entities/hint.entity';
import { HintsService } from './hints.service';

@AppController(Hint, 'hint', {
  query: {
    join: {
      categories: { eager: true },
      'categories.theme': { eager: true },
    },
  },
})
export class HintsController implements CrudController<Hint> {
  constructor(public service: HintsService) {}

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(Hint);
  }

  @UseGuards(AuthGuard, new RoleGuard([UserRole.ADMIN]))
  @Get('random')
  async getRandomHint(@Query('filter') filters?: string[]): Promise<Hint> {
    const hint = await this.service.getRandom(getManager(), filters);

    return this.service.repo.save({
      ...hint,
      timesDrawn: hint.timesDrawn + 1,
    });
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
