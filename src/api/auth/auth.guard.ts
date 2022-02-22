/* eslint-disable @typescript-eslint/no-namespace */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { tokenSecret } from 'src/config/auth';

import { AuthService } from './auth.service';
import { AuthenticatedUser } from './dtos/authenticated-user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const [, token] = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token required!');
    }

    const verified = verify(token, tokenSecret);

    if (!verified) {
      throw new UnauthorizedException('Invalid token!');
    }

    try {
      request.user = (await this.authService.findOne(
        <string>verified.sub,
      )) as any as AuthenticatedUser;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
