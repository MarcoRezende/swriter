import { Genre } from 'src/genre/entities/genre.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Hint extends BaseEntity<Hint> {
  @OneToMany(type => Genre, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  genres: Genre[];
}
