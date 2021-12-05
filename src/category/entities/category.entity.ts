import { IsString } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Category extends BaseEntity<Category> {
  @ManyToMany(type => Hint, hint => hint.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: false,
    cascade: true,
  })
  hint: Hint;

  @ManyToOne(type => Theme, theme => theme.categories, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  theme: Theme;

  @IsString()
  @Column({ nullable: false, unique: true })
  name: string;
}
