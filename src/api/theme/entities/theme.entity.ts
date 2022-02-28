import { Category } from '@api/category/entities/category.entity';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/description.decorator';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Theme extends BaseEntity<Theme> {
  @OneToMany(() => Category, category => category.theme, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  categories: Category[];

  @IsString()
  @Column({ nullable: false, unique: true })
  @Description(Theme, {
    subject: 'Nome',
    type: 'text',
    placeholder: 'nome do tema',
    rules: { required: true },
  })
  name: string;
}
