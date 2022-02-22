import { classToClass } from 'class-transformer';

import { User } from '../../user/entities/user.entity';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';

export class UserMap {
  static toDto({ id, name, email, role }: User): AuthenticatedUser {
    return classToClass({
      id,
      name,
      email,
      role,
    });
  }
}
