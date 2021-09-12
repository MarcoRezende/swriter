import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Mood } from './entities/mood.entity';
import { MoodService } from './mood.service';

@Crud({
  model: {
    type: Mood,
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
export class MoodController implements CrudController<Mood> {
  constructor(public service: MoodService) {}
}
