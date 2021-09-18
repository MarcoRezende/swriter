import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Hint } from 'src/hints/entities/hint.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Category extends BaseEntity<Category> {
  @ManyToOne(type => Hint, hint => hint.categories, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  hint: Hint;

  @IsString()
  @Column({ nullable: false, unique: true })
  name: string;

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

  @IsString()
  @Column({ nullable: false })
  kind: string;

  @AfterLoad()
  updateTimesDrawn() {
    this.timesDrawn++;
  }
}
