import { IsEnum } from 'class-validator';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity } from 'typeorm';
import { GENRES, MOOD, PHRASE, WORD } from '../models/hints-kind.model';

const EveryKind = {
  ...GENRES,
  ...MOOD,
  ...PHRASE,
  ...WORD,
};

const EveryKindEnum: typeof EveryKind = EveryKind;

@Entity()
export class Hint extends BaseEntity<Hint> {
  @IsEnum(GENRES, { always: true, each: true })
  @Column()
  genres: GENRES;
}
