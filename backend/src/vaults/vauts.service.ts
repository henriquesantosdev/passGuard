import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Injectable()
export class VaultService {
  constructor(private readonly prisma: PrismaService) {}

  async getVaults(tokenPayload: TokenPayloadDto) {
    try {
      const vaults = await this.prisma.vault.findMany({
        where: {
          userId: tokenPayload.sub,
        },
      });

      return vaults;
    } catch {
      throw new HttpException('Unable to get vaults', HttpStatus.BAD_REQUEST);
    }
  }

  async findVault(id: string, tokenPayload: TokenPayloadDto) {
    const vault = await this.prisma.vault.findFirst({
      where: {
        id,
      },
    });

    if (vault.userId !== tokenPayload.sub) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return vault;
  }

  async createVault(
    createVault: CreateVaultDto,
    tokenPayload: TokenPayloadDto,
  ) {
    try {
      const vault = await this.prisma.vault.create({
        data: {
          userId: tokenPayload.sub,
          service_name: createVault.service_name,
          email: createVault.email || '',
          username: createVault.username || '',
          password: createVault.password,
        },
      });

      return {
        statusCode: 201,
        message: 'Vault created',
        vault,
      };
    } catch (error) {
      throw new HttpException(
        `Unable to create a vault: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateVault(
    id: string,
    updateVaultDto: UpdateVaultDto,
    tokenPayload: TokenPayloadDto,
  ) {
    try {
      const vault = await this.prisma.vault.findFirst({
        where: {
          id,
        },
      });

      if (vault.userId !== tokenPayload.sub) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const updated = await this.prisma.vault.update({
        where: {
          id,
        },
        data: {
          userId: tokenPayload.sub,
          service_name: updateVaultDto.service_name,
          email: updateVaultDto.email || vault.email,
          username: updateVaultDto.username || vault.username,
          password: updateVaultDto.password,
        },
      });

      return {
        statusCode: 200,
        message: 'Vault updated',
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        `Unable to update vault: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteVault(id: string, tokenPayload: TokenPayloadDto) {
    try {
      const vault = await this.prisma.vault.findFirst({
        where: {
          id,
        },
      });

      if (vault.userId !== tokenPayload.sub) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const deleted = await this.prisma.vault.delete({
        where: {
          id,
        },
      });

      return {
        statusCode: 200,
        message: 'Vault deleted',
        data: deleted,
      };
    } catch (error) {
      throw new HttpException(
        `Unable to delete vault: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
