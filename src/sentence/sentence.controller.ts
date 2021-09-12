import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Sentence } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';

@Crud({
  model: {
    type: Sentence,
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
@Controller('sentence')
export class GenreController implements CrudController<Sentence> {
  constructor(public service: SentenceService) {}
}
