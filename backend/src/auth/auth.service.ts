import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { HashingServiceProtocol } from './hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService,
  ) {}

  async authenticate(signinDto: SigninDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: signinDto.email,
        },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const passwordIsValid = await this.hashingService.compare(
        signinDto.password,
        user.password,
      );

      if (!passwordIsValid) {
        throw new HttpException(
          'Email or password invalid',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const jwtToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.jwtTtl,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );

      return {
        id: user.id,
        email: user.email,
        passphrase: user.passphrase,
        created_at: user.created_at,
        token: jwtToken,
      };
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
