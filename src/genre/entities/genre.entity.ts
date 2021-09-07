import { IsEnum } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GENRES } from '../models/genre.model';

@Entity()
export class Genre extends BaseEntity<Genre> {
  @IsEnum(GENRES)
  @Column({ nullable: false })
  name: GENRES;

  @ManyToOne(type => Hint, hint => hint.genres, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  hint: Hint;
}
