import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVaultDto {
  @IsNotEmpty()
  @IsString()
  service_name: string;
  @IsString()
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsString()
  username?: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
