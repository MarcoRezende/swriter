import { Hint } from 'src/hints/entities/hint.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Genre extends BaseEntity<Genre> {
  @ManyToOne(type => Hint, hint => hint.genres, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  hint: Hint;

  @Column({ nullable: false })
  name: string;
}
