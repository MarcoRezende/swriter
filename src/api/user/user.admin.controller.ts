import { AdminController } from '@decorators/admin-controller.decorator';
import {
  DescriptionProps,
  entityDescription,
} from '@decorators/description.decorator';
import { Get, Req } from '@nestjs/common';
import type { CrudController } from '@nestjsx/crud';
import { Request } from 'express';

import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@AdminController(User, 'user')
export class UserAdminController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Get('entityDescription')
  async entityDescription(): Promise<DescriptionProps[]> {
    return entityDescription(User);
  }

  @Get('me')
  async getProfile(@Req() request: Request): Promise<User> {
    const { user } = request;

    return this.service.findOne(user.id);
  }
}
