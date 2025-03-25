import { PartialType } from '@nestjs/mapped-types';
import { CreateVaultDto } from './create-vault.dto';

export class UpdateVaultDto extends PartialType(CreateVaultDto) {}
