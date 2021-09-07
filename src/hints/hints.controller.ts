import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HintsService } from './hints.service';
import { Hint } from './entities/hint.entity';
import { Crud, CrudController, CrudRequest } from '@nestjsx/crud';
import { GENRES } from 'src/genre/models/genre.model';
import { getManager } from 'typeorm';

@Crud({
  model: {
    type: Hint,
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
@Controller('hints')
export class HintsController implements CrudController<Hint> {
  constructor(public service: HintsService) {}
}
