import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

@Crud({
  model: {
    type: Genre,
  },
})
@Controller('genre')
export class GenreController implements CrudController<Genre> {
  constructor(public service: GenreService) {}
}
