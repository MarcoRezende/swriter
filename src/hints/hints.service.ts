import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hint } from './entities/hint.entity';

@Injectable()
export class HintsService extends TypeOrmCrudService<Hint> {
  constructor(@InjectRepository(Hint) hintsService) {
    super(hintsService);
  }
}
