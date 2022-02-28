import { Body, Controller, Post } from '@nestjs/common';
import { getManager } from 'typeorm';

import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<LoginResponse> {
    return this.service.login(getManager(), email, password);
  }
}
