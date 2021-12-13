import { IsInt } from 'class-validator';
import {
  BeforeUpdate,
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
  @Description({ subject: 'Criado', type: 'dateTime' })
  createdDate?: Date;

  @Description({ subject: 'Atualizado', type: 'dateTime' })
  updatedDate?: Date;

  @BeforeUpdate()
  updateDate() {
    // updates even when relation gets updated
    this.updatedDate = new Date();
  }
}
