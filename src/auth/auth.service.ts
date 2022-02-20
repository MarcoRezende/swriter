import { ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  tokenSecret,
  refreshTokenSecret,
  tokenExpiresIn,
  refreshTokenExpiresIn,
} from 'src/config/auth';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { LoginResponse } from './dtos/login-response.dto';

export class AuthService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.repo.findOne({ email });

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

    await this.repo.save({
      ...user,
      refreshToken,
    });

    return { token, user: { email } };
  }
}
