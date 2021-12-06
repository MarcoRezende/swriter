import * as fileSystem from 'fs';
import { EntityManager, getManager, getRepository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Hint } from './entities/hint.entity';
import { CsvParserService } from '../csv-parser/csv-parse.service';

@Injectable()
export class HintsService extends TypeOrmCrudService<Hint> {
  constructor(
    @InjectRepository(Hint) hintsService,
    private csvParser: CsvParserService,
  ) {
    super(hintsService);
  }

  public repo = getRepository(Hint);

  async getRandom(manager: EntityManager): Promise<Hint> {
    return manager
      .createQueryBuilder(Hint, 'hint')
      .leftJoinAndSelect('hint.categories', 'categories')
      .orderBy('RAND()')
      .getOneOrFail();
  }

  async parseCsv(file: Express.Multer.File) {
    return this.csvParser.parseCsv<Hint>(getManager(), file, Hint, {
      insertIntoTable: true,
    });
  }
}
