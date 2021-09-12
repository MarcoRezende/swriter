import { Genre } from 'src/genre/entities/genre.entity';
import { Mood } from 'src/mood/entities/mood.entity';
import { Sentence } from 'src/sentence/entities/sentence.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Hint extends BaseEntity<Hint> {
  @OneToMany(type => Genre, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  genres: Genre[];

  @OneToMany(type => Genre, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  moods: Mood[];

  @OneToMany(type => Genre, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  sentences: Sentence[];

  @Column({ nullable: false })
  tip: string;
}
