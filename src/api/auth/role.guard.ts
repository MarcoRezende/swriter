import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public roles: string[] = []) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest<Request>().user;

    if (!user || !this.roles.includes(user.role)) {
      return false;
    }

    return true;
  }
}
