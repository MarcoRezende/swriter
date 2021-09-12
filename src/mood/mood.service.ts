import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Mood } from './entities/mood.entity';

@Injectable()
export class SentenceService extends TypeOrmCrudService<Mood> {
  constructor(@InjectRepository(Mood) sentenceService) {
    super(sentenceService);
  }
}
