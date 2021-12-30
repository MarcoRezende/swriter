import { diskStorage } from 'multer';
import {
  DescriptionProps,
  entityDescription,
} from 'src/_common/decorators/describe';
import { DeleteResult, getManager } from 'typeorm';

import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Crud, CrudController } from '@nestjsx/crud';

import { Hint } from './entities/hint.entity';
import { HintsService } from './hints.service';
import { RequestQueryParser } from '@nestjsx/crud-request';

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
    alwaysPaginate: true,
    maxLimit: 50,
    join: {
      categories: { eager: true },
      'categories.theme': { eager: true },
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

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(Hint);
  }

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
