import { Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { getManager } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';
import { GENRES } from './models/genre.model';

@Crud({
  model: {
    type: Genre,
  },
})
@Controller('genre')
export class GenreController implements CrudController<Genre> {
  constructor(public service: GenreService) {}

  @Get('getOne')
  async getOne() {
    return await this.service.find({ relations: ['hint'] });
  }

  @Post('createOne')
  async createOne() {
    const hint = new Genre({ name: GENRES.ROMANCE });
    const manager = getManager();

    return await manager.save(hint);
  }
}
