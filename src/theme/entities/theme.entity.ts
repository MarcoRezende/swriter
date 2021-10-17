import { IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Theme extends BaseEntity<Theme> {
  @ManyToOne(type => Category, hint => hint.theme, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  categories: Category[];

  @IsString()
  @Column({ nullable: false, unique: true })
  name: string;
}
