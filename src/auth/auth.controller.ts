import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/shared/decorator/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/shared/decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('register')
  register(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.register(loginAuthDto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard('jwt-strategy'))
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    return this.authService.findUserById(user.userId);
  }
}
