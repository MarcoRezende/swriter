import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Hint extends BaseEntity<Hint> {
  @ManyToMany(type => Category, genre => genre.hint, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  @JoinTable()
  categories: Category[];

  @Column({ nullable: false, unique: true })
  tip: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  author?: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  book?: string;

  @IsNumber()
  @Column({ nullable: false, default: 0 })
  timesDrawn?: number;

  @IsBoolean()
  @Column({ nullable: true, default: false })
  bookmarked?: boolean;
}
