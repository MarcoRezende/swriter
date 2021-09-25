import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Hint extends BaseEntity<Hint> {
  @OneToMany(type => Category, genre => genre.hint, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  categories: Category[];

  @Column({ nullable: false })
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

  @AfterLoad()
  updateTimesDrawn() {
    this.timesDrawn++;
  }
}
