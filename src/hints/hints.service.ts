import { EntityManager, getManager, getRepository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getRandom(manager: EntityManager, filters?: string[]): Promise<Hint> {
    const buildQuery = () => {
      return (filters ?? []).reduce((filters: string[], filter) => {
        const [path, _operator, value] = filter.split('||');

        if (!value) {
          throw new BadRequestException('Value required');
        }

        switch (path) {
          case 'tip':
            filters.push(`${path} LIKE '%${value}%'`);
            break;

          case 'categories.name':
            filters.push(
              `${path} IN (${value
                .split(',')
                .map(v => `'${v}'`)
                .join(',')})`,
            );
            break;

          case 'categories.theme.name':
            filters.push(`${path.split('.').slice(1).join('.')} = '${value}'`);
            break;
        }

        return filters;
      }, []);
    };

    const query = buildQuery();

    const queryBuilder = manager
      .createQueryBuilder(Hint, 'hint')
      .leftJoinAndSelect('hint.categories', 'categories')
      .leftJoinAndSelect('categories.theme', 'theme')
      .where(query.join(' AND '))
      .orderBy('RAND()');

    return queryBuilder.getOneOrFail();
  }

  async parseCsv(file: Express.Multer.File) {
    return this.csvParser.parseCsv<Hint>(getManager(), file, Hint, {
      insertIntoTable: true,
    });
  }
}
