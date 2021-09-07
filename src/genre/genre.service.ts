import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService extends TypeOrmCrudService<Genre> {
  constructor(@InjectRepository(Genre) genreService) {
    super(genreService);
  }
}
