import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.getUser(createUserDto);
  }
}
