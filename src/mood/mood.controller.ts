import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Mood } from './entities/mood.entity';
import { SentenceService } from './Mood.service';

@Crud({
  model: {
    type: Mood,
  },
  query: {
    join: {
      genres: { eager: true },
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@Controller('Mood')
export class GenreController implements CrudController<Mood> {
  constructor(public service: SentenceService) {}
}
