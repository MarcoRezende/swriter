import { IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/describe';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Theme extends BaseEntity<Theme> {
  @OneToMany(type => Category, category => category.theme, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: true,
  })
  categories: Category[];

  @IsString()
  @Column({ nullable: false, unique: true })
  @Description({ subject: 'Nome' })
  name: string;
}
