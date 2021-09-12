import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Sentence } from './entities/sentence.entity';
import { SentenceService } from './sentence.service';

@Crud({
  model: {
    type: Sentence,
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
export class SentenceController implements CrudController<Sentence> {
  constructor(public service: SentenceService) {}
}
