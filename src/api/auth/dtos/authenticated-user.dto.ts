import { UserRole } from '@api/user/entities/user.entity';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
