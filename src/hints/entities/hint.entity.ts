import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Hint extends BaseEntity<Hint> {
  @OneToMany(type => Category, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  categories: Category[];

  @Column({ nullable: false })
  tip: string;
}
