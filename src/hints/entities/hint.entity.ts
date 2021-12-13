import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/describe';
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
  @Description({ subject: 'Dica' })
  tip: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Description({ subject: 'Autor' })
  author?: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Description({ subject: 'livro' })
  book?: string;

  @IsNumber()
  @Column({ nullable: false, default: 0 })
  @Description({ subject: 'Vezes sorteada' })
  timesDrawn?: number;

  @IsBoolean()
  @Column({ nullable: true, default: false })
  bookmarked?: boolean;
}
