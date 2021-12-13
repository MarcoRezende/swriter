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
    // updates even when relation gets updated
    Object.assign(this, { ...obj, updatedDate: new Date() });
  }

  @IsInt()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  @Description({ subject: 'Criado', type: 'dateTime' })
  createdDate?: Date;

  @UpdateDateColumn({ update: true })
  @Description({ subject: 'Atualizado', type: 'dateTime' })
  updatedDate?: Date;
}
