import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Hint } from './entities/hint.entity';

@Injectable()
export class HintsService extends TypeOrmCrudService<Hint> {}
