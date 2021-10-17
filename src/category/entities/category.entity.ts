import { IsString } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Category extends BaseEntity<Category> {
  @ManyToOne(type => Hint, hint => hint.categories, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  hint: Hint;

  @ManyToOne(type => Theme, theme => theme.categories, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  theme: Theme;

  @IsString()
  @Column({ nullable: false, unique: true })
  name: string;
}
