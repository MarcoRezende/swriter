import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sentence } from './entities/sentence.entity';

@Injectable()
export class SentenceService extends TypeOrmCrudService<Sentence> {
  constructor(@InjectRepository(Sentence) sentenceService) {
    super(sentenceService);
  }
}
