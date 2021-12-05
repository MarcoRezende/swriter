import { IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
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
  name: string;
}
