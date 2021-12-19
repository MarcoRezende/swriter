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
  @Description(Hint, {
    subject: 'Categorias',
    type: 'multi-select',
    placeholder: 'selecione',
    rules: { required: true },
  })
  categories: Category[];

  @Column({ nullable: false, unique: true })
  @Description(Hint, {
    subject: 'Dica',
    type: 'textarea',
    placeholder: 'frase ou palavra',
    rules: { required: true },
  })
  tip: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Description(Hint, {
    subject: 'Autor',
    type: 'text',
    placeholder: 'criador da obra',
  })
  author?: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Description(Hint, {
    subject: 'livro',
    type: 'text',
    placeholder: 'obra',
  })
  book?: string;

  @IsNumber()
  @Column({ nullable: false, default: 0 })
  @Description(Hint, { subject: 'Vezes sorteada' })
  timesDrawn?: number;

  @IsBoolean()
  @Column({ nullable: true, default: false })
  bookmarked?: boolean;
}
