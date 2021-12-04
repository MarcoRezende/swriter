import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EntityManager, getRepository } from 'typeorm';
import { Hint } from './entities/hint.entity';

@Injectable()
export class HintsService extends TypeOrmCrudService<Hint> {
  constructor(@InjectRepository(Hint) hintsService) {
    super(hintsService);
  }

  public repo = getRepository(Hint);

  async getRandom(manager: EntityManager): Promise<Hint> {
    return manager
      .createQueryBuilder(Hint, 'hint')
      .leftJoinAndSelect('hint.categories', 'categories')
      .orderBy('RAND()')
      .getOne();
  }
}
