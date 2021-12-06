import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeepPartial,
} from 'typeorm';
import { IsInt } from 'class-validator';

export class BaseEntity<T> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj);
  }

  @IsInt()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  updatedDate?: Date;
}
