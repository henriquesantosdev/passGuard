import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VaultService } from './vauts.service';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Controller('vaults')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Get()
  getVaults(@TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.vaultService.getVaults(tokenPayload);
  }

  @Get(':id')
  findVault(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.vaultService.findVault(id, tokenPayload);
  }

  @Post()
  createValt(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    @Body() createVaultDto: CreateVaultDto,
  ) {
    return this.vaultService.createVault(createVaultDto, tokenPayload);
  }

  @Put(':id')
  updateVault(
    @Param('id') id: string,
    @Body() updateVault: UpdateVaultDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.vaultService.updateVault(id, updateVault, tokenPayload);
  }

  @Delete(':id')
  deleteVault(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.vaultService.deleteVault(id, tokenPayload);
  }
}
