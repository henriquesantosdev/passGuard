import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  getUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
