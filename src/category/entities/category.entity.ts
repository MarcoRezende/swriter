import { IsString } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/describe';
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
  @Description(Category, {
    subject: 'Tema',
    type: 'select',
    placeholder: 'tema',
    rules: { required: true },
  })
  theme: Theme;

  @IsString()
  @Column({ nullable: false, unique: true })
  @Description(Category, {
    subject: 'Nome',
    type: 'text',
    placeholder: 'nome da categoria',
    rules: { required: true },
  })
  name: string;
}
