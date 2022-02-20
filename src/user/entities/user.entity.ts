import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/_common/base_entity';
import { Description } from 'src/_common/decorators/describe';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity<User> {
  @Length(3, 75)
  @Column({ type: 'varchar', length: 75, nullable: false })
  @Description(User, {
    subject: 'Nome',
    placeholder: 'nome',
    rules: { required: true },
  })
  name: string;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  @Description(User, {
    subject: 'Email',
    placeholder: 'email',
    rules: { required: true },
  })
  email: string;

  @Exclude()
  @Length(6, 200)
  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  refreshToken?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 8);
  }
}
