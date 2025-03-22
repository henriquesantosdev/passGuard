import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Public } from './guard/isPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  signIn(@Body() signinDto: SigninDto) {
    return this.authService.authenticate(signinDto);
  }
}
