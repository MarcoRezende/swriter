import { Hint } from '@api/hints/entities/hint.entity';
import { Theme } from '@api/theme/entities/theme.entity';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/description.decorator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Category extends BaseEntity<Category> {
  @ManyToMany(() => Hint, hint => hint.categories, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: false,
    cascade: true,
  })
  hint: Hint;

  @ManyToOne(() => Theme, theme => theme.categories, {
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
