import { UserRole } from '../../user/entities/user.entity';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
