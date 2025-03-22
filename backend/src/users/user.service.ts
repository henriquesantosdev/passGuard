import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

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
      const passwordHash = await this.hashingService.hash(
        createUserDto.password,
      );

      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: passwordHash,
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

  async updateUser(
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto,
  ) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: tokenPayload.sub,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.id !== tokenPayload.sub) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const newDataUser: {
        email?: string;
        password?: string;
      } = {
        email: updateUserDto.email || user.email,
      };

      if (updateUserDto?.password) {
        const newPasswordHash = await this.hashingService.hash(
          updateUserDto.password,
        );
        newDataUser['password'] = newPasswordHash;
      }

      const updated = await this.prisma.user.update({
        where: {
          id: tokenPayload.sub,
        },
        data: {
          email: newDataUser.email,
          password: newDataUser?.password || user?.password,
        },
      });

      return {
        statusCode: 200,
        message: 'User updated',
        data: {
          updated,
        },
      };
    } catch {
      return new HttpException(
        'Unable to register user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(tokenPayload: TokenPayloadDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: tokenPayload.sub,
        },
      });

      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.id !== tokenPayload.sub) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const deleted = await this.prisma.user.delete({
        where: {
          id: tokenPayload.sub,
        },
      });

      return {
        statusCode: 200,
        message: 'Use deleted',
        data: deleted,
      };
    } catch {
      return new HttpException('Unable to delete user', HttpStatus.BAD_REQUEST);
    }
  }
}
