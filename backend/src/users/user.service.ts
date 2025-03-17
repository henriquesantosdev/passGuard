import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch {
      return new HttpException(
        'Unable to return users',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });

      return {
        statusCode: 201,
        message: 'Use created',
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return new ConflictException({
          statusCode: 409,
          message: 'Email already exists',
        });
      }

      return new HttpException(
        'Unable to register user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updated = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email: updateUserDto.email,
          password: updateUserDto.password,
        },
      });

      return updated;
    } catch {
      return new HttpException(
        'Unable to register user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const deleted = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      return deleted;
    } catch {
      return new HttpException('Unable to delete user', HttpStatus.BAD_REQUEST);
    }
  }
}
