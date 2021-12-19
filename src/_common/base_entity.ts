import { IsInt } from 'class-validator';
import {
  CreateDateColumn,
  DeepPartial,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Description } from './decorators/describe';

export class BaseEntity<T> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj);
  }

  @IsInt()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  @Description(BaseEntity, { subject: 'Criado', type: 'dateTime' })
  createdDate?: Date;

  @UpdateDateColumn({ update: true })
  @Description(BaseEntity, { subject: 'Atualizado', type: 'dateTime' })
  updatedDate?: Date;
}
