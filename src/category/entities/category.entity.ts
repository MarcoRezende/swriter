import { IsString } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Category extends BaseEntity<Category> {
  @ManyToOne(type => Hint, hint => hint.categories, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  hint: Hint;

  @IsString()
  @Column({ nullable: false })
  name: string;

  @IsString()
  @Column({ nullable: false })
  kind: string;
}
