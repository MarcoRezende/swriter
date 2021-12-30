import { BadRequestException, Injectable } from '@nestjs/common';
import { promises, createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { EntityManager } from 'typeorm';

interface Entity<T> {
  new (...args: any): T;
}

interface Options {
  insertIntoTable?: boolean;
  delimiter?: string;
}

@Injectable()
export class CsvParserService {
  constructor() {}

  async parseCsv<K = any>(
    manager: EntityManager,
    file: Express.Multer.File,
    EntityTarget: Entity<K>,
    options?: Options,
  ): Promise<K[]> {
    new EntityTarget();
    return new Promise(resolve => {
      const entities: K[] = [];
      const stream = createReadStream(file.path);
      let count = 0;
      let headers = [];

      stream
        .pipe(parse({ delimiter: options.delimiter || ',' }))
        .on('data', async (row: string[]) => {
          if (count < 1) {
            headers = row;
          } else if (count > 1) {
            entities.push(
              new EntityTarget(
                row.reduce((entity: K, rowProp: string, index) => {
                  if (row.length > headers.length) {
                    throw new BadRequestException(
                      'Invalid row length',
                      'SURPLUS_PROPERTY',
                    );
                  }

                  entity[headers[index]] =
                    rowProp.charAt(0).toUpperCase() + rowProp.slice(1);
                  return entity;
                }, {} as K),
              ),
            );
          }
          count++;
        })
        .on('end', () => {
          promises.unlink(file.path); // remove o arquivo especificado

          if (options?.insertIntoTable) {
            this.insert<K>(manager, entities, EntityTarget);
          }

          resolve(entities);
        })
        .on('error', err => {
          throw new BadRequestException(err);
        });
    });
  }

  private async insert<K>(
    manager: EntityManager,
    values: K[],
    EntityTarget: Entity<K>,
  ) {
    let [query, params] = manager
      .createQueryBuilder()
      .insert()
      .into(EntityTarget)
      .values(values)
      .getQueryAndParameters();
    query = query.replace('INSERT', 'INSERT IGNORE');

    await manager.query(query, params);
  }
}
