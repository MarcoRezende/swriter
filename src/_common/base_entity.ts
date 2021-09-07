import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

export class BaseEntity<T> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj);
  }

  @IsInt()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Expose({ groups: ['showDate'] })
  @CreateDateColumn()
  createdDate?: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate?: Date;

  @Exclude()
  _doNotValidate: boolean;
}
