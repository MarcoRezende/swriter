import { ForbiddenException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  tokenSecret,
  refreshTokenSecret,
  tokenExpiresIn,
  refreshTokenExpiresIn,
} from 'src/config/auth';
import { EntityManager } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { LoginResponse } from './dtos/login-response.dto';

export class AuthService {
  async login(
    manager: EntityManager,
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await manager.findOne(User, { email });

    if (!user) {
      throw new ForbiddenException('Password or email incorrect');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ForbiddenException('Password or email incorrect');
    }

    const token = sign({}, tokenSecret, {
      subject: user.id,
      expiresIn: tokenExpiresIn,
    });

    const refreshToken = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    await manager.save(User, {
      ...user,
      refreshToken,
    });

    return { token, user: { email } };
  }
}
