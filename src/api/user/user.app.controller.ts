import { Controller } from '@nestjs/common';
import { CrudController } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@Controller('user')
export class UserAppController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
