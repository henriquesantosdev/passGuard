import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVaultDto {
  @IsNotEmpty()
  @IsString()
  service_name: string;
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsString()
  username?: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
