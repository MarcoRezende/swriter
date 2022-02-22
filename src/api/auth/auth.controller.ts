import { Body, Controller, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('login')
  async login(
    @Body('payload') { email, password }: { email: string; password: string },
  ): Promise<LoginResponse> {
    return this.service.login(email, password);
  }
}
