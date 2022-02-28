import { AppController } from '@decorators/app-controller.decorator';
import type { CrudController } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@AppController(User, 'user')
export class UserAppController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
